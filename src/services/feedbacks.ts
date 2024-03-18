import { URL } from '@constants/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Feedback, FeedbackRequest, FeedbackResponse } from './types';

export const headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
};

export const feedbacksAPI = createApi({
    reducerPath: 'feedbacksAPI',
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    endpoints: (build) => ({
        getFeedback: build.query<Feedback, FeedbackRequest>({
            query: (id) => ({
                url: `/feedback/${id}`,
                headers: headers,
            }),
        }),
        getFeedbacks: build.query<FeedbackResponse, FeedbackRequest>({
            query: () => ({
                url: '/feedback',
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

export const { useGetFeedbackQuery, useGetFeedbacksQuery } = feedbacksAPI;
