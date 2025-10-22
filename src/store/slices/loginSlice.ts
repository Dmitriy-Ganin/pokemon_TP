import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialLoginState: string = ''

const loginSlice = createSlice({
  name: 'login',
  initialState: initialLoginState,
  reducers: {
    setLogin(_, action: PayloadAction<string>) {
     return action.payload;
    },
    clearLogin() {
      return '';
    }
  }
})

export const { clearLogin, setLogin } = loginSlice.actions;
export default loginSlice.reducer;