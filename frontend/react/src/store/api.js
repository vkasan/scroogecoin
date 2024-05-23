import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken, saveToken } from './localstorage';

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
  tagTypes: ['auth'],
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
  }),
});

export const {
  useCheckAuthQuery,
  useRegistrationMutation,
  useLoginMutation,
} = api;
