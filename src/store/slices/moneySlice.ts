import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialMoneyState: number = 0

const moneySlice = createSlice({
  name: 'money',
  initialState: initialMoneyState,
  reducers: {
    setMoney(_, action: PayloadAction<number>) {
      return action.payload
    },
    incrementMoney(state, action: PayloadAction<number>) {
      return state + action.payload;
    },
    decrementMoney(state, action: PayloadAction<number>) {
      return state - action.payload;
    }
  }
})

export const { setMoney, incrementMoney, decrementMoney } = moneySlice.actions;
export default moneySlice.reducer;