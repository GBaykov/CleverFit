import { ApplicationState, RootState } from '@redux/configure-store';
import { Exercises, UserTraining, UserTrainingTransform } from '@redux/types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isOldDate } from '@utils/format-date.ts';

export enum CardModalBody {
    TRAINING = 'training',
    EXERCISES = 'exercises',
}

export enum ChangeType {
    ADD_NEW = 'addNew',
    EDIT_FUTURE = 'editFuture',
    EDIT_OLD = 'editOld',
}

export type InitialStateTraining = {
    isBlock: boolean;
    defaultTrainings: string[];
    typeEdit: ChangeType;
    userTraining: UserTrainingTransform;
    createdTraining: UserTraining;
    cardModalState: CardModalBody | undefined;
};

const defaultExercises = [
    {
        name: '',
        approaches: 3,
        weight: 0,
        replays: 1,
    },
];

export const initialState: InitialStateTraining = {
    isBlock: true,
    defaultTrainings: [],
    userTraining: {},
    typeEdit: ChangeType.ADD_NEW,
    createdTraining: {
        name: '',
        date: '',
        id: '',
        isImplementation: false,
        exercises: [],
    },
    cardModalState: CardModalBody.TRAINING,
};

export const trainingSlice = createSlice({
    name: 'trainings',
    initialState,
    reducers: {
        resetTraining(state) {
            state.createdTraining = initialState.createdTraining;
        },
        addDefaultTraining(state) {
            state.createdTraining.exercises = defaultExercises;
        },
        setDefaultTraining(state, { payload: defaultTrainings }: PayloadAction<string[]>) {
            state.defaultTrainings = defaultTrainings;
            state.isBlock = false;
        },
        setUserTrainings(state, { payload: userTraining }: PayloadAction<UserTrainingTransform>) {
            state.userTraining = userTraining;
        },
        setTrainingData(
            state,
            { payload: userTrainingData }: PayloadAction<Partial<UserTraining>>,
        ) {
            if (userTrainingData?.name) {
                if (isOldDate(userTrainingData.date)) {
                    state.typeEdit = ChangeType.EDIT_OLD;
                }

                if (
                    state.userTraining[userTrainingData.date as string]?.find(
                        ({ name }) => name === userTrainingData.name,
                    )?.name === userTrainingData.name
                ) {
                    state.typeEdit = ChangeType.EDIT_FUTURE;
                } else {
                    state.typeEdit = ChangeType.ADD_NEW;
                }
            }

            state.createdTraining = { ...state.createdTraining, ...userTrainingData };
        },
        setExercisesNotEmpty(state, { payload: exercises }: PayloadAction<Exercises[]>) {
            state.createdTraining.exercises = exercises;
        },
        setExercisesData(
            state,
            { payload: exercises }: PayloadAction<Partial<Exercises> & { index: number }>,
        ) {
            state.createdTraining.exercises[exercises.index] = {
                ...state.createdTraining.exercises[exercises.index],
                ...exercises,
            };
        },
        addExercises(state) {
            state.createdTraining.exercises.push(...defaultExercises);
        },
        deleteExercises(state, { payload: indexes }: PayloadAction<number[]>) {
            state.createdTraining.exercises = state.createdTraining.exercises.filter(
                (_, index) => !indexes.includes(index),
            );
        },
        setStateCardModal(state, { payload: status }: PayloadAction<CardModalBody | undefined>) {
            state.cardModalState = status || undefined;
        },
        resetStateCreating(state) {
            state.createdTraining = initialState.createdTraining;
            state.typeEdit = ChangeType.ADD_NEW;
        },
        resetState() {
            return initialState;
        },
    },
});

export const userTraining = (state: ApplicationState) => state.trainings.userTraining;

export const trainingsSelector = (state: ApplicationState) => state.trainings;

export const {
    resetTraining,
    setDefaultTraining,
    setExercisesData,
    setTrainingData,
    setUserTrainings,
    addExercises,
    deleteExercises,
    addDefaultTraining,
    setStateCardModal,
    resetState,
    setExercisesNotEmpty,
    resetStateCreating,
} = trainingSlice.actions;

export default trainingSlice.reducer;
