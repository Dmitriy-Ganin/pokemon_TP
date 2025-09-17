import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APIURL } from '../constants/apiURL';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: APIURL.AUTH_URL,
    credentials: 'include',
  }),
  endpoints: (buil) => ({
    login: buil.mutation({
      query: (credentials) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: buil.mutation({
      query: (userData) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body: userData,
      }),
    }),
    refresh: buil.query({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET',
        credentials: 'include'
      }),
    }),
  })
});

export const { useLoginMutation, useRegisterMutation, useRefreshQuery  } = authAPI;