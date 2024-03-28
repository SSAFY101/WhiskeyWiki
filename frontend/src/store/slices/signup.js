import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  user: {
    loginId: "",
    password: "",
    nickName: "",
    address: "",
    gender: "",
    age: 0,
  },
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
    stepOne: (state, action) => {
      state.loginId = action.payload.userId;
      state.password = action.payload.userPassword;
    },
    stepTwo: (state, action) => {
      state.nickName = action.payload.nickName;
      state.age = action.payload.age;
      state.gender = action.payload.gender;
    },
    stepThree: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const signupAction = signupSlice.actions;
export default signupSlice;
