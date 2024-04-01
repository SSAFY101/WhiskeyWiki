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
      state.user.loginId = action.payload.userId;
      state.user.password = action.payload.userPassword;
    },
    stepTwo: (state, action) => {
      state.user.nickName = action.payload.nickname;
      state.user.age = action.payload.age;
      state.user.gender = action.payload.gender;
    },
    stepThree: (state, action) => {
      state.user.address = action.payload;
    },
  },
});

export const signupAction = signupSlice.actions;
export default signupSlice;
