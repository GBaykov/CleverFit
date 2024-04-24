import { URL } from '@constants/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserInfo, UserResponce } from './types';
import { ApiEndpoints } from '@constants/api';
import { RootState } from '@redux/configure-store';
import { setAppAlert, setAppLoader } from '@redux/reducers/appSlice';
import { setProfileInfo } from '@redux/reducers/userSlice';

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

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoader(true));
                    const { data } = await queryFulfilled;
                    dispatch(setAppLoader(false));
                    dispatch(setProfileInfo(data));
                } catch {
                    dispatch(setAppLoader(false));
                }
            },
            providesTags: ['UserInfo'],
        }),
        updateUser: build.mutation<UserResponce, UserInfo>({
            query: (body) => ({
                url: ApiEndpoints.USER,
                method: 'PUT',
                body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoader(true));
                    const { data } = await queryFulfilled;

                    dispatch(setProfileInfo(data));
                    dispatch(
                        setAppAlert({
                            message: 'Данные профиля успешно обновлены',
                            type: 'success',
                        }),
                    );
                    dispatch(setAppLoader(false));
                } catch {
                    dispatch(setAppLoader(false));
                }
            },
            invalidatesTags: (_, error) => (error ? [] : ['UserInfo']),
            // invalidatesTags: ['UserInfo'],
        }),
    }),
});

export const { useGetUserInfoQuery, useUpdateUserMutation, useLazyGetUserInfoQuery } = userAPI;
