import { CardTraining, TrainingDataCall } from '../trainingCard';

import { CardExercises } from '../exerciseCard';
import { FORMAT_Y_M_D, formatDate, isOldDate } from '@utils/format-date';
import {
    CardModalBody,
    ChangeType,
    addDefaultTraining,
    resetTraining,
    setStateCardModal,
    setTrainingData,
    trainingsSelector,
    addExercises,
    deleteExercises,
    setExercisesData,
    setExercisesNotEmpty,
} from '@redux/reducers/trainingSlice';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { UserTraining, UserTrainingTransform } from '@redux/types';
import moment, { Moment } from 'moment';
import { leftMenuSelector, setStateLeftMenu } from '@redux/reducers/appSlice';
import { useCreateTrainingMutation, useUpdateTrainingMutation } from '../../../services/trainings';
import { StyledButtonWrapper, StyledCalendarModal, StyledTitleDate } from './styled';
import { DrawerRight } from '@components/drawerRight';
import { BadgeChanged } from '@components/badgeChanged';
import { Button, Typography } from 'antd';
import { ExercisesForm } from '../exerciseForm';
import { EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Nullable } from 'src/commonTypes';
import { ModalNotification } from '@components/modal/calendarModalError';

export const findUserTraining = (
    userTraining: UserTrainingTransform,
    date: string,
    nameTraining?: string,
) => userTraining[date as string]?.filter((element) => element.name === nameTraining)[0] || [];

type CardModalWrapper = {
    offsetTop: number;
    trainings: UserTraining[];
    date: Moment;
    onClose: () => void;
    isLeft: boolean;
};

const titleDrawer: Record<ChangeType, string> = {
    [ChangeType.ADD_NEW]: 'Добавление упражнений',
    [ChangeType.EDIT_OLD]: 'Редактирование',
    [ChangeType.EDIT_FUTURE]: 'Редактирование',
};

const iconDrawer: Record<ChangeType, ReactNode> = {
    [ChangeType.ADD_NEW]: <PlusOutlined />,
    [ChangeType.EDIT_OLD]: <EditOutlined />,
    [ChangeType.EDIT_FUTURE]: <EditOutlined />,
};

export const CardModal: FC<CardModalWrapper> = ({
    isLeft,
    onClose,
    trainings = [],
    date,
    offsetTop,
}) => {
    const [selectTraining, setSelectTraining] = useState('');
    const [indexes, setIndexes] = useState<number[]>([]);
    const [openModalError, setOpenModalError] = useState(false);
    const dispatch = useAppDispatch();
    const openMenu = useAppSelector(leftMenuSelector);
    const {
        defaultTrainings,
        cardModalState,
        typeEdit,
        createdTraining: { exercises, date: dataCreated, name, id },
        userTraining,
    } = useAppSelector(trainingsSelector);

    const [createTraining, { isLoading: isLoadingCreate, isError: isErrorCreate }] =
        useCreateTrainingMutation();
    const [updateTraining, { isLoading: isLoadingUpdate, isError: isErrorUpdate }] =
        useUpdateTrainingMutation();

    useEffect(() => {
        if (isErrorCreate || isErrorUpdate) {
            setOpenModalError(true);
        }
    }, [isErrorCreate, isErrorUpdate]);

    const onNextState = (data: TrainingDataCall) => {
        const dateFormat = formatDate(data.date, FORMAT_Y_M_D);

        dispatch(resetTraining());
        dispatch(setStateCardModal(data.openFlag));
        setSelectTraining(data?.name || '');
        dispatch(
            setTrainingData({
                ...findUserTraining(userTraining, dateFormat, data?.name),
                date: dateFormat,
                name: data?.name,
            }),
        );
    };

    const onOpenMenu = (date: string | Moment) => {
        dispatch(setStateLeftMenu());
        dispatch(setTrainingData({ date: formatDate(date, FORMAT_Y_M_D) }));
        if (!exercises.length) {
            dispatch(addDefaultTraining());
        }
    };
    const onCloseDrawer = () => {
        dispatch(setStateLeftMenu());
        dispatch(setExercisesNotEmpty(exercises.filter(({ name }) => Boolean(name))));
    };
    const onSelectedTraining = (value: string, date: string | Moment) => {
        const valueFormatDate = formatDate(date, FORMAT_Y_M_D);

        dispatch(
            setTrainingData({
                date: valueFormatDate,
                name: value,
                exercises:
                    userTraining[valueFormatDate]?.filter(({ name }) => name === value)?.[0]
                        ?.exercises || [],
            }),
        );

        setSelectTraining(value);
    };

    const onSaveTraining = () => {
        const body = {
            isImplementation: isOldDate(dataCreated),
            id,
            name,
            exercises,
            date: `${dataCreated}T00:00:00.000Z`,
        };

        if (typeEdit !== ChangeType.ADD_NEW && id) {
            updateTraining(body);

            return;
        }

        createTraining(body);
    };

    const onSetIndex = (index: number) => {
        if (indexes.includes(index)) {
            setIndexes(indexes.filter((element) => element !== index));

            return;
        }

        setIndexes([...indexes, index]);
    };

    const onChangeApproaches = (value: Nullable<number>, index: number) => {
        dispatch(setExercisesData({ approaches: value || 0, index }));
    };

    const onChangeName = (value: Nullable<string>, index: number) => {
        dispatch(setExercisesData({ name: value || '', index }));
    };

    const onChangeReplays = (value: Nullable<number>, index: number) => {
        dispatch(setExercisesData({ replays: value || 0, index }));
    };

    const onChangeWeight = (value: Nullable<number>, index: number) => {
        dispatch(setExercisesData({ weight: value || 0, index }));
    };

    const addExercisesDataHandle = () => {
        dispatch(addExercises());
    };

    const deleteExercisesDataHandle = () => {
        dispatch(deleteExercises(indexes));
        setIndexes([]);
    };

    const onClickButtonError = () => {
        setOpenModalError(false);
        dispatch(setStateCardModal());
    };

    const ComponentToRender: Record<CardModalBody, ReactNode> = {
        [CardModalBody.TRAINING]: (
            <CardTraining
                disabledButton={defaultTrainings.length === trainings.length || isOldDate(date)}
                isTraining={Boolean(trainings.length)}
                trainings={trainings}
                date={date}
                onNextOpen={onNextState}
                openFlag={CardModalBody.EXERCISES}
                onClose={onClose}
            />
        ),
        [CardModalBody.EXERCISES]: (
            <CardExercises
                textButtonCancel={isOldDate(date) ? 'Сохранить изменения' : 'Сохранить'}
                isLoading={isLoadingCreate || isLoadingUpdate}
                defaultsTrainings={defaultTrainings}
                selectedTraining={selectTraining}
                trainings={trainings}
                exercises={exercises}
                onAddButton={onOpenMenu}
                onSaveButton={onSaveTraining}
                disabledSave={!exercises.length && typeEdit === ChangeType.ADD_NEW}
                date={date}
                onNextOpen={onNextState}
                openFlag={CardModalBody.TRAINING}
                onSelectedTraining={onSelectedTraining}
            />
        ),
    };

    return (
        <StyledCalendarModal offsetTop={offsetTop} isLeft={isLeft} position={{ offsetTop, isLeft }}>
            {ComponentToRender[cardModalState || CardModalBody.TRAINING]}
            <DrawerRight
                open={openMenu}
                onClose={onCloseDrawer}
                title={titleDrawer[typeEdit]}
                iconClose={iconDrawer[typeEdit]}
            >
                <div>
                    <StyledTitleDate>
                        <BadgeChanged
                            isStatus={true}
                            isEdit={false}
                            text={name}
                            date={moment(dataCreated)}
                        />
                        <Typography.Text type='secondary'>
                            {formatDate(dataCreated)}
                        </Typography.Text>
                    </StyledTitleDate>

                    {exercises.map(({ weight, approaches, name, replays }, index) => (
                        <ExercisesForm
                            key={index}
                            weight={weight}
                            approaches={approaches}
                            name={name}
                            replays={replays}
                            onChangeApproaches={onChangeApproaches}
                            onChangeName={onChangeName}
                            onChangeReplays={onChangeReplays}
                            onChangeWeight={onChangeWeight}
                            index={index}
                            indexes={indexes}
                            onCheckedElement={onSetIndex}
                            isCheck={typeEdit !== ChangeType.ADD_NEW}
                        />
                    ))}

                    <StyledButtonWrapper>
                        <Button
                            type='text'
                            icon={<PlusOutlined />}
                            size='small'
                            ghost={true}
                            onClick={addExercisesDataHandle}
                        >
                            Добавить ещё
                        </Button>
                        {typeEdit !== ChangeType.ADD_NEW && (
                            <Button
                                type='text'
                                icon={<MinusOutlined />}
                                size='small'
                                ghost={true}
                                disabled={!indexes.length}
                                onClick={deleteExercisesDataHandle}
                            >
                                Удалить
                            </Button>
                        )}
                    </StyledButtonWrapper>
                </div>
            </DrawerRight>
            <ModalNotification
                textButton='Закрыть'
                onClickButton={onClickButtonError}
                type='error'
                isCloseIcon={false}
                title='При сохранении данных произошла ошибка'
                subtitle='Придётся попробовать ещё раз'
                open={openModalError}
            />
        </StyledCalendarModal>
    );
};
