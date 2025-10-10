import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MoneyState {
  money: number;
}

const initialMoneyState: MoneyState = {
  money: 0,
}

const moneySlice = createSlice({
  name: 'money',
  initialState: initialMoneyState,
  reducers: {
    setMoney(state, action: PayloadAction<number>) {
      state.money = action.payload
    },
    incrementMoney(state, action: PayloadAction<number>) {
      state.money += action.payload;
    },
    decrementMoney(state, action: PayloadAction<number>) {
      state.money -= action.payload;
    }
  }
})

export const { setMoney, incrementMoney, decrementMoney } = moneySlice.actions;
export default moneySlice.reducer;