import { URL } from '@constants/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@redux/configure-store';
import { ApiEndpoints } from '@constants/api';
import { setAppLoader } from '@redux/reducers/appSlice';
import {
    CardModalBody,
    resetStateCreating,
    setDefaultTraining,
    setStateCardModal,
    setUserTrainings,
} from '@redux/reducers/trainingSlice';
import { Training, UserTraining, UserTrainingTransform } from '@redux/types';
import { FORMAT_Y_M_D, formatDate } from '@utils/format-date';
import moment from 'moment';

export const headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
};

export const calendarAPI = createApi({
    reducerPath: 'calendarAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: URL,
        prepareHeaders(headers, { getState }) {
            const token =
                localStorage.getItem('token') || (getState() as RootState).userReducer.token;

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ['Trainigs'],

    endpoints: (builder) => ({
        getTrainingList: builder.query<string[], void>({
            query: () => ({
                url: ApiEndpoints.TRAINING_LIST,
                method: 'GET',
            }),

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoader(true));
                    const { data } = await queryFulfilled;

                    dispatch(setAppLoader(false));
                    dispatch(setDefaultTraining(data));
                } catch {
                    dispatch(setAppLoader(false));
                }
            },
            transformResponse: (response: Training[]) => response.map(({ name }) => name),
        }),

        getUserTraining: builder.query<UserTrainingTransform, void>({
            query: () => ({
                url: ApiEndpoints.TRAINING,
                method: 'GET',
            }),

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoader(true));
                    const { data } = await queryFulfilled;

                    dispatch(setAppLoader(false));
                    dispatch(setUserTrainings(data));
                } catch {
                    dispatch(setAppLoader(false));
                }
            },
            transformResponse: (response: Array<Omit<UserTraining, 'id'> & { _id: string }>) =>
                response.reduce((acc: UserTrainingTransform, curr) => {
                    const key = formatDate(moment(curr.date), FORMAT_Y_M_D);

                    if (acc[key]?.length) {
                        // eslint-disable-next-line no-underscore-dangle
                        acc[key].push({ ...curr, id: curr._id });
                    } else {
                        // eslint-disable-next-line no-underscore-dangle
                        acc[key] = [{ ...curr, id: curr._id }];
                    }

                    return acc;
                }, {}),

            providesTags: ['Trainigs'],
        }),

        createTraining: builder.mutation<void, UserTraining>({
            query: (body) => ({
                url: ApiEndpoints.TRAINING,
                method: 'POST',

                body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoader(true));
                    await queryFulfilled;
                    dispatch(setStateCardModal(CardModalBody.TRAINING));
                    dispatch(setAppLoader(false));
                } catch {
                    dispatch(resetStateCreating());
                    dispatch(setAppLoader(false));
                }
            },

            invalidatesTags: (_, error) => (error ? [] : ['Trainigs']),
        }),

        updateTraining: builder.mutation<void, UserTraining>({
            query: (body) => ({
                url: `${ApiEndpoints.TRAINING}/${body.id}`,
                method: 'PUT',

                body: {
                    name: body.name,
                    date: body.date,
                    isImplementation: body.isImplementation,
                    exercises: body.exercises,
                },
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoader(true));
                    await queryFulfilled;
                    dispatch(setStateCardModal(CardModalBody.TRAINING));
                } catch {
                    dispatch(resetStateCreating());
                    dispatch(setAppLoader(false));
                }
            },

            invalidatesTags: (_, error) => (error ? [] : ['Trainigs']),
        }),
    }),
});
