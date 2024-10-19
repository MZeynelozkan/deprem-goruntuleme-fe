import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  search: string;
  currentCountry: string;
  _id: string;
}

const initialState: SearchState = {
  search: "",
  currentCountry: "",
  _id: "",
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
    setId: (state, action: PayloadAction<string>) => {
      state._id = action.payload;
    },
  },
});

export const { setSearch, setCurrentCountry, setId } = searchSlice.actions;
export default searchSlice.reducer;
