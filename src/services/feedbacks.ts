import { URL } from '@constants/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Feedback, FeedbackRequest, FeedbackResponse } from './types';
import { RootState } from '@redux/configure-store';

export const headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
};

export const feedbacksAPI = createApi({
    reducerPath: 'feedbacksAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: URL,
        prepareHeaders: (headers, { getState }) => {
            const token =
                localStorage.getItem('token') || (getState() as RootState).userReducer.token;

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (build) => ({
        getFeedbacks: build.query<FeedbackResponse, void>({
            query: () => ({
                url: '/feedback',
                headers: headers,
            }),
        }),
        getFeedback: build.query<Feedback, FeedbackRequest>({
            query: (id) => ({
                url: `/feedback/${id}`,
                headers: headers,
            }),
        }),

        // checkEmail: build.mutation<ResponseCheck, RequestCheck>({
        //     query: (email) => ({
        //         url: '/auth/check-email',
        //         method: 'POST',
        //         headers: headers,
        //         body: email,
        //     }),
        // }),
        // confirmEmail: build.mutation<ResponseConfirm, RequestConfirm>({
        //     query: (body) => ({
        //         url: '/auth/confirm-email',
        //         method: 'POST',
        //         headers: headers,
        //         body,
        //         credentials: 'include',
        //     }),
        // }),
    }),
});

export const { useGetFeedbacksQuery, useGetFeedbackQuery } = feedbacksAPI;
