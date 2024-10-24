/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Earthquake {
  date: string;
  magnitude: number;
}

interface City {
  location: any;
  _id: string;
  recentEarthquakes: any;
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
  countries: Country[]; // Yeni property ekleniyor
  data: Country[]; // An array of countries, each containing cities and their associated earthquakes
  selectedCountry?: Country; // Store the currently selected country
  selectedCity?: City | string; // Store the currently selected city
  location?: { latitude: number; longitude: number }; // Store the location of the selected country
  scale?: number; // Deprem büyüklüğü için yeni bir alan
  scaleDatas: any[]; // New property to hold scale data
  searchCityDatas?: any[];
  chartDatas: any[];
  rectangleCities?: any[];
}

// Initial state with empty countries array and no selected country or city
const initialState: DataState = {
  countries: [], // Yeni property başlangıçta boş
  data: [],
  selectedCountry: undefined, // No country selected initially
  selectedCity: undefined, // No city selected initially
  location: undefined,
  scale: undefined, // Başlangıçta scale boş
  scaleDatas: [], // Initialize with an empty array
  searchCityDatas: [],
  chartDatas: [],
  rectangleCities: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    // Set the entire data (list of countries)
    setData: (state, action: PayloadAction<Country[]>) => {
      state.data = action.payload;
    },

    setRectangleCities: (state, action: PayloadAction<any[]>) => {
      state.rectangleCities = action.payload;
    },

    // Set the entire countries array
    setCountries: (state, action: PayloadAction<Country[]>) => {
      state.countries = action.payload; // countries dizisini güncelle
    },
    setChartData: (state, action: PayloadAction<any[]>) => {
      state.chartDatas = action.payload; // Chart datasını state'e atar
    },

    // Action to set the selected country
    selectCountry: (state, action: PayloadAction<string>) => {
      const country = state.countries.find(
        (country) => country.name === action.payload
      );
      if (country) {
        // Assign the entire country object to selectedCountry
        state.selectedCountry = country;
        state.selectedCity = undefined; // Reset selected city when a country is selected
      }
    },

    // Action to set the selected city
    selectCity: (state, action: PayloadAction<City | string>) => {
      if (state.selectedCountry) {
        const city = state.selectedCountry.cities.find(
          (city) => city === action.payload
        );
        if (city) {
          // Assign the entire city object to selectedCity
          state.selectedCity = city;
        }
      }
    },

    setSearchData: (state, action: PayloadAction<any[]>) => {
      state.searchCityDatas = action.payload;
    },

    // Action to set the location (latitude and longitude)
    setLocation: (
      state,
      action: PayloadAction<{ latitude: number; longitude: number }>
    ) => {
      state.location = action.payload;
    },

    // Action to set the earthquake magnitude scale
    setScale: (state, action: PayloadAction<number>) => {
      state.scale = action.payload;
    },

    // Action to set scale data
    setScaleDatas: (state, action: PayloadAction<any[]>) => {
      state.scaleDatas = action.payload; // Set the scale data
    },

    // Clear selections for both country and city
    clearSelections: (state) => {
      state.selectedCountry = undefined;
      state.selectedCity = undefined;
      state.scale = undefined;
      state.scaleDatas = [];
      state.data = [];
      state.rectangleCities = [];
    },
  },
});

// Export actions
export const {
  setData,
  setCountries,
  selectCountry,
  selectCity,
  clearSelections,
  setLocation,
  setScale,
  setScaleDatas,
  setSearchData,
  setChartData,
  setRectangleCities,
} = dataSlice.actions;

// Export the reducer
export default dataSlice.reducer;
