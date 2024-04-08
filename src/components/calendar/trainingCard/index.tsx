import { BadgeChanged } from '@components/badgeChanged';
import { EmptyElement } from '@components/empty';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { CardModalBody } from '@redux/reducers/trainingSlice';
import { UserTraining } from '@redux/types';
import { Button, Card } from 'antd';
import { Moment } from 'moment';
import { FC, useEffect, useState } from 'react';
import { StyledTrainingCard, StyledTrainingCardTitle } from './styled';
import Meta from 'antd/lib/card/Meta';
import { formatDate } from '@utils/format-date';
import { CloseOutlined } from '@ant-design/icons';

export type TrainingDataCall = {
    date: Moment;
    openFlag: CardModalBody;
    name?: string;
};

type CardTrainingProps = {
    disabledButton: boolean;
    isTraining: boolean;
    trainings: UserTraining[];
    date: Moment;
    openFlag: CardModalBody;
    onNextOpen: (data: TrainingDataCall) => void;
    onClose: () => void;
};

export const CardTraining: FC<CardTrainingProps> = ({
    isTraining = false,
    trainings,
    date,
    onNextOpen,
    openFlag,
    onClose,
    disabledButton,
}) => {
    const [body, setBody] = useState(<EmptyElement />);

    const onNextOpenHandel = (value: Moment, name?: string) => {
        onNextOpen({ date: value, openFlag, name });
    };

    useEffect(() => {
        if (isTraining) {
            setBody(
                <div style={{ width: '100%', padding: '16px 12px' }}>
                    {trainings?.map(({ name, date, isImplementation, id }, index) => (
                        <BadgeChanged
                            index={index}
                            disabled={isImplementation}
                            key={id}
                            isStatus={true}
                            isEdit={true}
                            text={name}
                            date={date as unknown as Moment}
                            onChange={onNextOpenHandel}
                        />
                    ))}
                </div>,
            );
        }
    }, [trainings]);

    return (
        <Card
            data-test-id={DATA_TEST_ID.modalCreateTraining}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            actions={[
                <Button
                    disabled={disabledButton}
                    style={{ width: '90%', margin: '12px' }}
                    size='large'
                    type='primary'
                    onClick={() => onNextOpenHandel(date)}
                >
                    Создать тренировку
                </Button>,
            ]}
        >
            <StyledTrainingCard>
                <StyledTrainingCardTitle>
                    <Meta
                        style={{ textAlign: 'start' }}
                        title={`Тренировки на ${formatDate(date)}`}
                        description={!isTraining && 'Нет активных тренировок'}
                    />
                    <Button
                        data-test-id={DATA_TEST_ID.modalCreateTrainingButtonClose}
                        style={{ width: '12px', height: '12px' }}
                        type='text'
                        size='small'
                        icon={<CloseOutlined />}
                        onClick={onClose}
                    />
                </StyledTrainingCardTitle>
                {body}
            </StyledTrainingCard>
        </Card>
    );
};
