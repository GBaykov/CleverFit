import { URL } from '@constants/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserInfo, UserResponce } from './types';
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
        getUserInfo: build.query<UserResponce, void>({
            query: () => ({
                url: ApiEndpoints.USER_INFO,
            }),
            providesTags: ['UserInfo'],
        }),
        updateUser: build.mutation<UserResponce, UserInfo>({
            query: (body) => ({
                url: ApiEndpoints.USER,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['UserInfo'],
        }),
    }),
});

export const { useGetUserInfoQuery, useUpdateUserMutation, useLazyGetUserInfoQuery } = userAPI;
