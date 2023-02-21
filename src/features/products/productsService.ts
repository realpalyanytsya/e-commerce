/* eslint-disable indent */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL, limit } from '../../data';
import type {
    IGetPaginatedProductsParams,
    IGetPaginatedProductsRes,
    IProduct
} from './productsInterfaces';

export const productsApi = createApi({
    reducerPath: 'productsService',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ['products'],
    endpoints: (builder) => ({
        getPaginatedProducts: builder.query<
            IGetPaginatedProductsRes,
            IGetPaginatedProductsParams
        >({
            query: ({ page, query, brands, categories, priceRange }) => {
                const _query = query.length > 0 ? `q=${query ?? ''}` : '';

                const pagination = `&_page=${page}&_limit=${limit}`;

                const _brands = brands.length > 0 ? `&${brands}` : '';

                const _categories =
                    categories.length > 0 ? `&${categories}` : '';

                const _priceRange = `&${priceRange}`;

                return `products?${_query}${pagination}${_brands}${_categories}${_priceRange}`;
            },
            providesTags: (res) =>
                res?.products !== undefined
                    ? [
                          ...res.products.map(({ id }) => ({
                              type: 'products' as const,
                              id
                          })),
                          { type: 'products', id: 'LIST' }
                      ]
                    : [{ type: 'products', id: 'LIST' }],
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
