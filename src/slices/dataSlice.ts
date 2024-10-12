import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Earthquake {
  date: string;
  magnitude: number;
}

interface City {
  name: string;
  lat: number;
  lng: number;
  earthquakes: Earthquake[];
}

interface Country {
  name: string;
  cities: City[];
}

// Define the initial state type
interface DataState {
  data: Country[]; // This will be an array of countries
}

// Initial state with empty data array
const initialState: DataState = {
  data: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    // Here we define the payload to be an array of countries
    setData: (state, action: PayloadAction<Country[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;
