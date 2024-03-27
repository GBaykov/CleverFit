import { URL } from '@constants/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    Feedback,
    FeedbackPostRequest,
    FeedbackPostResponse,
    FeedbackRequest,
    FeedbackResponse,
} from './types';
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
    tagTypes: ['Feedbacks'],
    endpoints: (build) => ({
        getFeedbacks: build.query<FeedbackResponse, void>({
            query: () => ({
                url: '/feedback',
                headers,
            }),
            providesTags: ['Feedbacks'],
        }),
        getFeedback: build.query<Feedback, FeedbackRequest>({
            query: (id) => ({
                url: `/feedback/${id}`,
                headers,
            }),
            providesTags: ['Feedbacks'],
        }),

        postFeedback: build.mutation<FeedbackPostResponse, FeedbackPostRequest>({
            query: ({ message, rating }) => ({
                url: '/feedback',
                method: 'POST',
                headers,
                body: { message, rating },
            }),
            invalidatesTags: ['Feedbacks'],
        }),
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

export const { useGetFeedbacksQuery, useGetFeedbackQuery, usePostFeedbackMutation } = feedbacksAPI;
