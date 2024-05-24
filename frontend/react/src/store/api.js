import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken, saveToken } from './localstorage';
import { categoryIcon } from '../conts';


const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000',
  prepareHeaders: (headers) => {
    if (!headers.has('Authorization')) {
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Basic ${token}`);
      }
    }

    return headers;
  },
});

export const api = createApi({
  reducerPath: 'baseApi',
  baseQuery,
  tagTypes: ['auth', 'category', 'transactions'],
  endpoints: (builder) => ({
    checkAuth: builder.query({
      query: () => ({
        url: '/user_auth',
        method: 'POST',
      }),
    }),
    registration: builder.mutation({
      query: ({ name, email, password }) => ({
        url: '/user_register',
        method: 'POST',
        body: {
          name: name,
          email: email,
          pwd: password,
        }
      })
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/user_auth',
        method: 'POST',
        headers: {
          'Authorization': `Basic ${window.btoa(email + ':' + password)}`
        },
      }),
      transformResponse: (res, _, { email, password }) => {
        const toketn = window.btoa(email + ':' + password);
        saveToken(toketn);
        return res;
      }
    }),
    getUserData: builder.query({
      query: () => ({
        url: '/user_load_profile',
        method: 'POST',
      })
    }),
    updateUserData: builder.mutation({
      query: ({ name }) => ({
        url: '/user_update_profile',
        method: 'POST',
        body: {
          name
        }
      })
    }),
    getCategories: builder.query({
      query: () => ({
        url: '/load_categories',
        method: 'POST',
      }),
      transformResponse(res) {
        return res.categories?.reduce((acc, item) => {
          acc[item.id] = {
            ...item,
            icon: categoryIcon[item.icon] || '',
          };
          return acc;
        }, {});
      },
      providesTags: ['category'],
      keepUnusedDataFor: 10
    }),
    getTransactions: builder.query({
      query: () => ({
        url: '/load_transactions',
        method: 'POST',
      }),
      providesTags: ['transactions'],
      keepUnusedDataFor: 10
    }),
    createCategory: builder.mutation({
      query: (params) => ({
        url: '/category_create',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['category'],
    }),
    deleteCategory: builder.mutation({
      query: ({ id }) => ({
        url: '/category_delete',
        method: 'POST',
        body: {
          id,
        }
      }),
      invalidatesTags: ['category'],
    }),
    createTransaction: builder.mutation({
      query: ({ amount, date, categoryId, description }) => ({
        url: '/transaction_create',
        method: 'POST',
        body: {
          amount: Number(amount),
          date,
          category_id: categoryId,
          description,
        }
      }),
      invalidatesTags: ['transactions']
    }),
    deleteTransaction: builder.mutation({
      query: ({ id }) => ({
        url: '/transaction_delete',
        method: 'POST',
        body: {
          id,
        }
      }),
      invalidatesTags: ['transactions'],
    })
  }),
});

export const {
  useCheckAuthQuery,
  useRegistrationMutation,
  useLoginMutation,
  useGetUserDataQuery,
  useUpdateUserDataMutation,
  useGetCategoriesQuery,
  useGetTransactionsQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
} = api;
