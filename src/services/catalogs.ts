import { URL } from '@constants/constants';
import { CatalogsList } from './types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const catalogsAPI = createApi({
    reducerPath: 'catalogsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: URL,
    }),
    endpoints: (build) => ({
        getCatalogsTraningList: build.query<CatalogsList, void>({
            query: () => ({
                url: '/catalogs/training-list',
                // headers,
            }),
        }),
    }),
});

export const { useLazyGetCatalogsTraningListQuery, useGetCatalogsTraningListQuery } = catalogsAPI;
