import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  whiskeyList: [],
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    pageOne: (state) => {
      state.page = 1;
    },
    pageTwo: (state) => {
      state.page = 2;
    },
    pageThree: (state) => {
      state.page = 3;
    },
    setWhiskeyList: (state, action) => {
      state.whiskeyList = action.payload;
    },
  },
});

export const registerAction = registerSlice.actions;
export default registerSlice;
