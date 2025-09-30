import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie, removeAuthCookies } from '../utils/cookes';
import { clearToken, setAuthError  } from '../store/slices/tokenSlice';
import { refreshTokens } from '../utils/refreshTokens';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_POKEMON_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = getCookie('access_token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 500) {
    console.warn('Retrying after 500 error');
    await new Promise(resolve => setTimeout(resolve, 1000));
    result = await baseQuery(args, api, extraOptions);
  }

  if (result?.error?.status === 401) {
    console.log('Access token expired, attempting refresh...');

    const refreshSuccess = await refreshTokens(api.dispatch);

    if (refreshSuccess) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.error('Refresh failed. Logging out...');
      removeAuthCookies();
      api.dispatch(clearToken());
      api.dispatch(setAuthError(true));
    }
  }

  return result;
};