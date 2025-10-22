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

export const saveStateToStorage = (state: RootState) => {
  const username = state.login || localStorage.getItem('activeLogin');
  if (username) {
    saveState(state, username);
  }
};

const activeLogin = localStorage.getItem('activeLogin');
const persistedState = loadState(activeLogin || undefined);

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