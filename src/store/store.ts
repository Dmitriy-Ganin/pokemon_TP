import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './slices/loginSlice';
import tokenReducer from './slices/tokenSlice';
import moneyReducer from './slices/moneySlice';
import firstEntryReducer from './slices/firstEntrySlice';
import pokemonReducer from './slices/pokemonSlice';

import { authAPI } from '../API/authAPI';
import { baseAPI } from '../API/baseAPI';

const getStorageKey = (username?: string) => username ? username : 'pokemonState';

const loadState = (username?: string) => {
  const storageKey = getStorageKey(username);
  const originalState = localStorage.getItem(storageKey);
  if (originalState === null) {
    return undefined;
  }
  const parsedState = JSON.parse(originalState);
  return {
    login: parsedState.login,
    money: parsedState.money,
    pokemon: parsedState.pokemon,
  };
}

export const saveState = (state: RootState, username?: string) => {
  const storageKey = getStorageKey(username);
  const stateToSave = {
    login: state.login,
    money: state.money,
    pokemon: state.pokemon,
  };

  const serializedState = JSON.stringify(stateToSave);
  localStorage.setItem(storageKey, serializedState);
};

const currentLogin = loadState()?.login?.login;
const persistedState = loadState(currentLogin);

export const store = configureStore({
  preloadedState: persistedState,
  reducer: {
    login: loginReducer,
    token: tokenReducer,
    money: moneyReducer,
    firstEntry: firstEntryReducer,
    pokemon: pokemonReducer,

    [baseAPI.reducerPath]: baseAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseAPI.middleware).concat(authAPI.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

store.subscribe(() => {
  const state = store.getState();
  const username = state.login.login;
  if (username) {
    saveState(state, username);
  }
});