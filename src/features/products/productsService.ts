import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useAppSelector } from '../../app/store';
import { API_URL, LIMIT_ITEMS } from '../../data';
import { stringifyFiltersToParam, stringifyPriceToParam } from '../../utils';
import type {
    IGetPaginatedProductsParams,
    IGetPaginatedProductsRes,
    IProduct
} from './productsInterfaces';
import { selectProducts } from './productsSlice';

export const productsApi = createApi({
    reducerPath: 'productsService',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getPaginatedProducts: builder.query<
            IGetPaginatedProductsRes,
            IGetPaginatedProductsParams
        >({
            query: ({ page, query, brands, categories, priceRange }) => {
                const _query = query.length > 0 ? `q=${query ?? ''}` : '';

                const pagination = `&_page=${page}&_limit=${LIMIT_ITEMS}`;

                const _brands =
                    brands.length > 0 ? `&${brands.replaceAll(' ', '_')}` : '';

                const _categories =
                    categories.length > 0
                        ? `&${categories.replaceAll(' ', '_')}`
                        : '';

                const _priceRange = `&${priceRange}`;

                return `products?${_query}${pagination}${_brands}${_categories}${_priceRange}`;
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

const useProducts = () => {
    const {
        currentPage,
        query,
        activeBrands,
        activeCategories,
        activePriceRange
    } = useAppSelector(selectProducts);

    return productsApi.useGetPaginatedProductsQuery({
        page: currentPage,
        query,
        brands: stringifyFiltersToParam(activeBrands, 'brand'),
        categories: stringifyFiltersToParam(activeCategories, 'category'),
        priceRange: stringifyPriceToParam(activePriceRange)
    });
};

const {
    useGetBrandsQuery: useGetBrands,
    useGetCategoriesQuery: useGetCategories
} = productsApi;

export { useProducts, useGetBrands, useGetCategories };
