import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    ResponseLogin,
    RequestLogin,
    ResponseCheck,
    RequestCheck,
    ResponseConfirm,
    RequestConfirm,
    ResponseChangePass,
    RequestChangePass,
} from './types';

export const URL: string = 'https://marathon-api.clevertec.ru';

export const headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
};

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    endpoints: (build) => ({
        login: build.mutation<ResponseLogin, RequestLogin>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                headers: headers,
                body,
            }),
        }),
        signup: build.mutation<object, RequestLogin>({
            query: (body) => ({
                url: '/auth/registration',
                method: 'POST',
                headers: headers,
                body,
            }),
        }),
        checkEmail: build.mutation<ResponseCheck, RequestCheck>({
            query: (email) => ({
                url: '/auth/check-email',
                method: 'POST',
                headers: headers,
                body: email,
            }),
        }),
        confirmEmail: build.mutation<ResponseConfirm, RequestConfirm>({
            query: (body) => ({
                url: '/auth/confirm-email',
                method: 'POST',
                headers: headers,
                body,
                credentials: 'include',
            }),
        }),
        changePassord: build.mutation<ResponseChangePass, RequestChangePass>({
            query: (body) => ({
                url: '/auth/change-password',
                method: 'POST',
                headers: headers,
                body,
                credentials: 'include',
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useSignupMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useChangePassordMutation,
} = authAPI;
