import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  login: string;
}

const initialLoginState: LoginState = {
  login: '',
}

const loginSlice = createSlice({
  name: 'login',
  initialState: initialLoginState,
  reducers: {
    setLogin(state, action: PayloadAction<string>) {
      state.login = action.payload
    }
  }
})

export const { setLogin } = loginSlice.actions;
export default loginSlice.reducer;