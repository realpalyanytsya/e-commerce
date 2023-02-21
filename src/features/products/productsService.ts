import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
    IGetPaginatedProductsParams,
    IGetPaginatedProductsRes,
    IProduct
} from './products.interfaces';

const API_URL = 'https://e-commerce-server-kappa.vercel.app';
export const limit = 9;

export const productsApi = createApi({
    reducerPath: 'productsService',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getPaginatedProducts: builder.query<
            IGetPaginatedProductsRes,
            IGetPaginatedProductsParams
        >({
            query: ({ page, query, brands, categories }) => {
                const _query = `q=${query ?? ''}`;
                const pagination = `_page=${page}&_limit=${limit}`;
                const _brands = `&${brands}`;
                const _categories = `&${categories}`;

                return `products?${_query}&${pagination}${_brands}${_categories}`;
            },
            transformResponse(apiResponse: IProduct[], meta) {
                return {
                    products: apiResponse,
                    totalCount: Number(
                        meta?.response?.headers.get('X-Total-Count')
                    )
                };
            }
        }),
        getBrands: builder.query<string[], unknown>({
            query: () => 'brands'
        }),
        getCategories: builder.query<string[], unknown>({
            query: () => 'categories'
        })
    })
});

export const {
    useGetPaginatedProductsQuery: useGetProducts,
    useGetBrandsQuery: useGetBrands,
    useGetCategoriesQuery: useGetCategories
} = productsApi;
