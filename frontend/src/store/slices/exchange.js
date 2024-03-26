import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkedWhiskeyList: [],
};

const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    setCheckedWhiskeyList: (state, action) => {
      state.checkedWhiskeyList = action.payload;
    },
  },
});

export const exchangeAction = exchangeSlice.actions;
export default exchangeSlice;
