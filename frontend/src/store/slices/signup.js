import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
};

const signupSlice = createSlice({
  name: "signup",
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
  },
});

export const signupAction = signupSlice.actions;
export default signupSlice;
