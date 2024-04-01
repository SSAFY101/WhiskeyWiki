import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviewSubmitted: false,
}

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    submitReview: (state) => {
      state.reviewSubmitted = true;
    },
    resetReviewSubmission: (state) => {
      state.reviewSubmitted = false;
    }
  },
});

export default reviewSlice
export const { submitReview, resetReviewSubmission } = reviewSlice.actions;
