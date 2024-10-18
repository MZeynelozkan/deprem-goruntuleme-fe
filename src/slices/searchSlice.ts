import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  search: string;
  currentCountry: string;
  searchData: any[];
}

const initialState: SearchState = {
  search: "",
  currentCountry: "",
  searchData: [],
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
    setSearchData: (state, action: PayloadAction<any[]>) => {
      state.searchData = action.payload;
    },
  },
});

export const { setSearch, setCurrentCountry, setSearchData } =
  searchSlice.actions;
export default searchSlice.reducer;
