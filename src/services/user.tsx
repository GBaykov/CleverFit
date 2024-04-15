import { URL } from '@constants/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UpdateUserResponce, UserInfo } from './types';
import { ApiEndpoints } from '@constants/api';
import { RootState } from '@redux/configure-store';

export const userAPI = createApi({
    reducerPath: 'userAPI',

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
    tagTypes: ['UserInfo'],
    endpoints: (build) => ({
        getUserInfo: build.query<UserInfo, void>({
            query: () => ({
                url: ApiEndpoints.USER_INFO,
            }),
            providesTags: ['UserInfo'],
        }),
        updateUser: build.mutation<UpdateUserResponce, void>({
            query: () => ({
                url: ApiEndpoints.USER,
            }),
            invalidatesTags: ['UserInfo'],
        }),
    }),
});

export const { useGetUserInfoQuery, useUpdateUserMutation } = userAPI;
