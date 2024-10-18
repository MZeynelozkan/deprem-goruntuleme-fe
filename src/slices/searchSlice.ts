import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  search: string;
  currentCountry: string;
}

const initialState: SearchState = {
  search: "",
  currentCountry: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setCurrentCountry: (state, action: PayloadAction<string>) => {
      state.currentCountry = action.payload;
    },
  },
});

export const { setSearch, setCurrentCountry } = searchSlice.actions;
export default searchSlice.reducer;
