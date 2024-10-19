import { createSlice } from "@reduxjs/toolkit";

const postNewDataSlice = createSlice({
  name: "postNewData",
  initialState: {
    postNewData: {},
  },
  reducers: {
    postNewData: (state, action) => {
      state.postNewData = action.payload;
    },
  },
});

export const { postNewData } = postNewDataSlice.actions;
export default postNewDataSlice.reducer;
