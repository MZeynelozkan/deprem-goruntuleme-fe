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
  averageLocation?: { latitude: number; longitude: number }; // Optional property for average location
}

// Define the initial state type
interface DataState {
  data: Country[]; // An array of countries, each containing cities and their associated earthquakes
  selectedCountry?: Country; // Store the currently selected country
  selectedCity?: City; // Store the currently selected city
  location?: { lat: number; lng: number }; // Store the location of the selected country
}

// Initial state with empty data array and no selected country or city
const initialState: DataState = {
  data: [],
  selectedCountry: undefined, // No country selected initially
  selectedCity: undefined, // No city selected initially
  location: undefined,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    // Set the entire data (list of countries)
    setData: (state, action: PayloadAction<Country[]>) => {
      state.data = action.payload;
    },

    // Action to set the selected country
    selectCountry: (state, action: PayloadAction<string>) => {
      const country = state.data.find(
        (country) => country.name === action.payload
      );
      if (country) {
        // Assign the entire country object to selectedCountry
        state.selectedCountry = country;
        state.selectedCity = undefined; // Reset selected city when a country is selected
      }
    },

    // Action to set the selected city
    selectCity: (state, action: PayloadAction<string>) => {
      if (state.selectedCountry) {
        const city = state.selectedCountry.cities.find(
          (city) => city.name === action.payload
        );
        if (city) {
          // Assign the entire city object to selectedCity
          state.selectedCity = city;
        }
      }
    },

    // Action to set the location (latitude and longitude)
    setLocation: (
      state,
      action: PayloadAction<{ lat: number; lng: number }>
    ) => {
      state.location = action.payload;
    },

    // Clear selections for both country and city
    clearSelections: (state) => {
      state.selectedCountry = undefined;
      state.selectedCity = undefined;
    },
  },
});

// Export actions
export const {
  setData,
  selectCountry,
  selectCity,
  clearSelections,
  setLocation,
} = dataSlice.actions;

// Export the reducer
export default dataSlice.reducer;
