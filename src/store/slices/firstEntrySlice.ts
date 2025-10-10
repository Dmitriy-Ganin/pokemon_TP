import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FirstEntryState {
  isFirstEntry: boolean;
}

const initialFirstEntryState: FirstEntryState = {
  isFirstEntry: false,
}

const firstEntrySlise = createSlice({
  name: 'firstEntry',
  initialState: initialFirstEntryState,
  reducers: {
    setFirstEntry(state, action: PayloadAction<boolean>) {
      state.isFirstEntry = action.payload;
    },
  }
})

export const { setFirstEntry } = firstEntrySlise.actions;
export default firstEntrySlise.reducer;