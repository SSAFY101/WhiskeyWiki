import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkedWhiskeyList: [],
  otherbarCount: 0,
};

const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    setCheckedWhiskeyList: (state, action) => {
      state.checkedWhiskeyList = action.payload;
    },
    setOtherbarCount: (state, action) => {
      state.otherbarCount = action.payload;
    },
  },
});

export const exchangeAction = exchangeSlice.actions;
export default exchangeSlice;
