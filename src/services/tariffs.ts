import { URL } from '@constants/constants';
import { RootState } from '@redux/configure-store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TariffList } from './types';
import { ApiEndpoints } from '@constants/api';
import { setAppLoader, setTariffList } from '@redux/reducers/appSlice';

export const tariffAPI = createApi({
    reducerPath: 'tariffAPI',

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
    tagTypes: ['TariffList'],
    endpoints: (build) => ({
        getTariffList: build.query<TariffList, void>({
            query: () => ({
                url: ApiEndpoints.TARIFF_LIST,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoader(true));
                    const { data } = await queryFulfilled;

                    dispatch(setAppLoader(false));
                    dispatch(setTariffList(data));
                } catch {
                    dispatch(setAppLoader(false));
                }
            },
            providesTags: ['TariffList'],
        }),
    }),
});

export const { useGetTariffListQuery } = tariffAPI;
