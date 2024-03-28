import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  whiskeys: [],
}

const whiskeyInfoSlice = createSlice({
  name: "whiskeyInfo",
  initialState,
  reducers: {
    setWhiskeys: (state, action) => {
      state.whiskeys = action.payload;
    }
  },
});

export default whiskeyInfoSlice
export const { setWhiskeys } = whiskeyInfoSlice.actions;
