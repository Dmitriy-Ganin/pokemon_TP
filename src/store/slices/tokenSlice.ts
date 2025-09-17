import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getAccessToken } from '../../utils/cookes';

interface tokenState {
  token: string | null;
  authError: boolean;
}

const initialTokenState: tokenState = {
  token: getAccessToken(),
  authError: false,
};

export const authSlice = createSlice({
  name: 'token',
  initialState: initialTokenState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
    setAuthError: (state, action: PayloadAction<boolean>) => {
      state.authError = action.payload;
    },
  },
});

export const { setToken, clearToken, setAuthError } = authSlice.actions;
export default authSlice.reducer;