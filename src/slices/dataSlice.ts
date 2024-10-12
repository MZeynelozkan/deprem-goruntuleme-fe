import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Earthquake {
  date: string;
  magnitude: number;
}

interface City {
  name: string;
  lat: number;
  lng: number;
  earthquakes: Earthquake[]; // Each city contains an array of earthquakes
}

interface Country {
  name: string;
  lat: number; // Latitude for the country
  lng: number; // Longitude for the country
  cities: City[]; // Array of cities within the country
}

// Define the initial state type
interface DataState {
  data: Country[]; // An array of countries, each containing cities and their associated earthquakes
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
