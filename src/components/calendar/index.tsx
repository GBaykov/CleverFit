import { FC, useEffect, useState } from 'react';

import { Calendar } from 'antd';
import moment, { Moment } from 'moment';

import { DATA_TEST_ID } from '@constants/data-test-id';
import { Portal } from '@components/portal';
import { CardModal } from './calendarCardModal';
import { FORMAT_Y_M_D, formatDate } from '@utils/format-date';
import {
    CardModalBody,
    resetState,
    setStateCardModal,
    trainingsSelector,
    userTraining,
} from '@redux/reducers/trainingSlice';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useGetUserTrainingQuery, useLazyGetTrainingListQuery } from '../../services/trainings';
import {
    CALENDAR_ID,
    attachPortal,
    attachPortalMobile,
    changeCardEvent,
} from '@utils/attach-portal';
import { LocalData } from '@constants/calendar-options';
import { BadgeBlocks } from './badgeBlocks';
import { useWindowSize } from '@uidotdev/usehooks';
import { StyledCellMobile } from './styled';
import './styles.css';
import { ModalNotification } from '@components/modal/calendarModalError';

export const CalendarApp: FC = () => {
    const size = useWindowSize();
    const [parent, setParent] = useState<HTMLElement | undefined>(undefined);
    const [offsetTop, setOffsetTop] = useState(0);
    const [isDesktopVersion, setDesktopVersion] = useState(true);
    const [day, setDay] = useState(1);
    const [selectedDate, setSelectedDate] = useState(moment);
    const [openModal, setOpenModal] = useState(false);
    const training = useAppSelector(userTraining);
    const { defaultTrainings, isBlock, cardModalState } = useAppSelector(trainingsSelector);
    const dispatch = useAppDispatch();
    const [getList, { isError: isErrorRequest }] = useLazyGetTrainingListQuery();

    useGetUserTrainingQuery();
    useEffect(() => {
        if (!defaultTrainings?.length) {
            getList();
        }
    }, []);

    useEffect(() => {
        if (!cardModalState) {
            setParent(undefined);
        }
    }, [cardModalState]);

    useEffect(() => {
        if (isErrorRequest) {
            setOpenModal(true);
        }
    }, [isErrorRequest]);

    const onGetListHandler = () => {
        setOpenModal(false);
        getList();
    };

    const onCloseModal = () => {
        dispatch(resetState());
        setOpenModal(false);
    };

    useEffect(() => {
        if (Number(size.width) && Number(size.width) < 850) {
            setDesktopVersion(false);
            setParent(undefined);
        } else {
            setDesktopVersion(true);
            setParent(undefined);
            setOffsetTop(0);
        }
    }, [size.width]);

    const onStop = (event: any, date: Moment | string) => {
        if (!isBlock) {
            dispatch(setStateCardModal(CardModalBody.TRAINING));
            event.stopPropagation();
            setParent(attachPortal({ date }));
            setSelectedDate(moment(date));
            setDay(moment(date).day());
        }
    };

    const onPanelChange = () => {
        if (!isBlock) {
            changeCardEvent(false);
            setParent(undefined);
        }
    };

    const onChangeCell = (date: Moment | string) => {
        if (!isBlock) {
            setParent(attachPortal({ date }));
        }
    };

    const onSelectMonth = (date: Moment) => {
        if (!isDesktopVersion && !isBlock) {
            dispatch(setStateCardModal(CardModalBody.TRAINING));
            const { element, offsetTop: offsetTopElement } = attachPortalMobile({
                date: formatDate(date, FORMAT_Y_M_D),
            });

            setOffsetTop(offsetTopElement);
            setParent(element || undefined);
            setSelectedDate(moment(date));
        }
        changeCardEvent(true);
    };

    const onClose = () => setParent(undefined);

    const dateCellRender = (value: Moment) => {
        const trainingByDay = training[formatDate(value, FORMAT_Y_M_D)];

        if (!isDesktopVersion) {
            return trainingByDay?.length ? <StyledCellMobile /> : undefined;
        }

        return (
            <BadgeBlocks
                date={value}
                onChangeCell={onChangeCell}
                listData={trainingByDay}
                onStop={onStop}
            />
        );
    };

    return (
        <div id={CALENDAR_ID}>
            <Calendar
                fullscreen={isDesktopVersion}
                className='cell'
                locale={LocalData}
                dateCellRender={dateCellRender}
                onSelect={onSelectMonth}
                onPanelChange={onPanelChange}
            />
            {parent && (
                <Portal container={parent}>
                    <CardModal
                        offsetTop={offsetTop}
                        trainings={training[formatDate(selectedDate, FORMAT_Y_M_D)]}
                        isLeft={day !== 0 && day !== 6}
                        onClose={onClose}
                        date={selectedDate}
                    />
                </Portal>
            )}
            <ModalNotification
                textButton='Обновить'
                onClickButton={onGetListHandler}
                type='warning'
                isCloseIcon={true}
                title='При открытии данных произошла ошибка'
                subtitle='Попробуйте ещё раз.'
                open={openModal}
                onClose={onCloseModal}
                modalBtnId={DATA_TEST_ID.modalErrorUserTrainingButton}
                modalTitleId={DATA_TEST_ID.modalErrorUserTrainingTitle}
                modalSubTitleId={DATA_TEST_ID.modalErrorUserTrainingSubTitle}
                modalButtonCloseId={DATA_TEST_ID.modalErrorUserTrainingButtonClose}
            />
        </div>
    );
};
