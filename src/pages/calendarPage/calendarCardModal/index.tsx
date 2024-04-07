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
import { Moment } from 'moment';
import { leftMenuSelector, setStateLeftMenu } from '@redux/reducers/appSlice';
import { useCreateTrainingMutation, useUpdateTrainingMutation } from 'src/services/trainings';
import { StyledCalendarModal } from './styled';

export type Nullable<T> = T | null;

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

        console.log(JSON.stringify(body), 'body');
        if (typeEdit !== ChangeType.ADD_NEW && id) {
            updateTraining(body);

            return;
        }

        createTraining(body);
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
        </StyledCalendarModal>
    );
};
