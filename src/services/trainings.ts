import { URL } from '@constants/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserTrainings } from './types';
import { RootState } from '@redux/configure-store';

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

    endpoints: (build) => ({
        getUserTrainings: build.query<UserTrainings, void>({
            query: () => ({
                url: '/training',
                headers,
            }),
            providesTags: ['Trainigs'],
        }),

        postUserTrainig: build.mutation({
            query: () => ({
                url: '/training',
                method: 'POST',
                headers,
            }),
            invalidatesTags: ['Trainigs'],
        }),
        updateUserTrainig: build.mutation({
            query: (id) => ({
                url: `/training/${id}`,
            }),
        }),
        deleteUserTrainig: build.mutation<void, string>({
            query: (id) => ({
                url: `/training/${id}`,
            }),
        }),
    }),
});
