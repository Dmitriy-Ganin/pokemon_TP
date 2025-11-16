import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './slices/loginSlice';
import tokenReducer from './slices/tokenSlice';
import moneyReducer from './slices/moneySlice';
import firstEntryReducer from './slices/firstEntrySlice';
import pokemonReducer from './slices/pokemonSlice';
import { PokemonState } from '../API/baseAPI'

import { authAPI } from '../API/authAPI';
import { baseAPI } from '../API/baseAPI';

const ACCOUNTS_KEY = 'accounts';

interface UserData {
  login: string;
  money: number;
  pokemon: PokemonState [];
}

interface AccountsState {
  accounts: {
    [login: string]: UserData;
  };
}

export const loadState = (username?: string) => {
  const allAccountsJSON = localStorage.getItem(ACCOUNTS_KEY);
  if (!allAccountsJSON) {
    return undefined;
  }
  const allAccounts: AccountsState = JSON.parse(allAccountsJSON);
  if (username && allAccounts.accounts[username]) {
    return allAccounts.accounts[username];
  }
  else return undefined;
}

export const saveState = (state: RootState, username?: string) => {
  if (!username) return;
  const allAccountsJSON = localStorage.getItem(ACCOUNTS_KEY);
  let existingAccounts = { accounts: {} };

  if (allAccountsJSON) {
    existingAccounts = JSON.parse(allAccountsJSON);
  }

  const stateToSave: UserData = {
    login: state.login,
    money: state.money,
    pokemon: state.pokemon,
  };

  const newAccountsState: AccountsState = {
    accounts: {
      ...existingAccounts.accounts,
      [username]: stateToSave 
    }
  }
  const serializedState = JSON.stringify(newAccountsState);
  localStorage.setItem(ACCOUNTS_KEY, serializedState);

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