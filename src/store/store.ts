import { configureStore } from "@reduxjs/toolkit";

import loginReducer from './slices/loginSlice';
import tokenReducer from './slices/tokenSlice';

import { authAPI } from '../API/authAPI';
import { baseAPI } from '../API/baseAPI';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    token: tokenReducer,
    [baseAPI.reducerPath]: baseAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseAPI.middleware).concat(authAPI.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch