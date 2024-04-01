import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nickName: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setNickname: (state, action) => {
      state.nickName = action.payload;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice;
