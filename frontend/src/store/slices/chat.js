import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userWhiskeyList: [],
  pairWhiskeyList: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUserWhiskeyList: (state, action) => {
      state.userWhiskeyList = action.payload;
    },
    setPairWhiskeyList: (state, action) => {
      state.pairWhiskeyList = action.payload;
    },
  },
});

export const chatAction = chatSlice.actions;
export default chatSlice;
