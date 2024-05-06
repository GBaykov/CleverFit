import { CardModalBody } from '@redux/reducers/trainingSlice';
import { Exercises, UserTraining } from '@redux/types';
import { Moment } from 'moment';
import { TrainingDataCall } from '../trainingCard';
import { FC, useEffect, useState } from 'react';
import { EmptyElement } from '@components/empty';
import { isOldDate } from '@utils/format-date';
import { BadgeChanged } from '@components/badgeChanged';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { SelectDouble } from '../selectDouble';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { StyledBattonGroup, StyledExerciseCard, StyledExerciseWraper } from './styled';
import { StyledTrainingCard } from '../trainingCard/styled';

export const isExercisesNotEmpty = (exercises: Exercises[]) =>
    exercises.filter(({ name }) => Boolean(name)).length;

type CardExercisesProps = {
    textButtonCancel: string;
    defaultsTrainings: string[];
    selectedTraining: string;
    isLoading: boolean;
    disabledSave: boolean;
    trainings: UserTraining[];
    exercises: Exercises[];
    date: Moment;
    openFlag: CardModalBody;
    onAddButton: (date: Moment) => void;
    onSaveButton: () => void;
    onNextOpen: (data: TrainingDataCall) => void;
    onSelectedTraining: (value: string, data: string | Moment) => void;
};

export const CardExercises: FC<CardExercisesProps> = ({
    defaultsTrainings,
    selectedTraining,
    trainings,
    exercises,
    onAddButton,
    onSaveButton,
    date,
    onNextOpen,
    onSelectedTraining,
    openFlag,
    disabledSave,
    isLoading,
    textButtonCancel,
}) => {
    const [body, setBody] = useState(<EmptyElement />);
    const selectedTrainings = isOldDate(date)
        ? trainings.filter(({ isImplementation }) => !isImplementation).map(({ name }) => name)
        : trainings.map(({ name }) => name);
    const isDisabled = !defaultsTrainings.includes(selectedTraining);

    const onNextOpenHandel = () => {
        onNextOpen({ openFlag, date });
    };

    const onSelectedTrainingHandel = (value: string) => {
        onSelectedTraining(value, date);
    };

    useEffect(() => {
        if (exercises && exercises.length && isExercisesNotEmpty(exercises)) {
            setBody(
                <div style={{ width: '100%', overflow: 'auto', padding: '16px 0 12px' }}>
                    {exercises?.map(({ name }, index) => (
                        <BadgeChanged
                            index={index}
                            isStatus={false}
                            isEdit={true}
                            text={name}
                            date={date}
                            onChange={() => onAddButton(date)}
                        />
                    ))}
                </div>,
            );
        } else {
            setBody(<EmptyElement />);
        }
    }, [trainings, exercises]);

    return (
        <StyledExerciseCard
            data-test-id={DATA_TEST_ID.modalCreateExercise}
            actions={[
                <StyledBattonGroup>
                    <Button
                        size='middle'
                        type='ghost'
                        onClick={() => onAddButton(date)}
                        disabled={isDisabled || isLoading}
                    >
                        Добавить упражнения
                    </Button>
                    <Button
                        size='middle'
                        type='link'
                        loading={isLoading}
                        style={{ marginTop: '12px' }}
                        onClick={onSaveButton}
                        disabled={disabledSave}
                    >
                        {textButtonCancel}
                    </Button>
                </StyledBattonGroup>,
            ]}
        >
            <StyledTrainingCard>
                <StyledExerciseWraper>
                    <Button
                        data-test-id={DATA_TEST_ID.modalExerciseTrainingButtonClose}
                        type='text'
                        size='small'
                        icon={<ArrowLeftOutlined />}
                        onClick={onNextOpenHandel}
                    />
                    <SelectDouble
                        isDouble={!isOldDate(date)}
                        defaultItem={selectedTraining}
                        onSelectItem={onSelectedTrainingHandel}
                        selectedItems={selectedTrainings}
                        defaultsItems={defaultsTrainings}
                    />
                </StyledExerciseWraper>
                {body}
            </StyledTrainingCard>
        </StyledExerciseCard>
    );
};
