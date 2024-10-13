import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: "",
    currentCity: {},
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },

    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
  },
});

export const { setSearch, setCurrentCity } = searchSlice.actions;
export default searchSlice.reducer;
