import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialFirstEntryState: boolean = false;

const firstEntrySlise = createSlice({
  name: 'firstEntry',
  initialState: initialFirstEntryState,
  reducers: {
    setFirstEntry(_, action: PayloadAction<boolean>) {
      return action.payload;
    },
  }
})

export const { setFirstEntry } = firstEntrySlise.actions;
export default firstEntrySlise.reducer;