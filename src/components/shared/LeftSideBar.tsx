import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCitiesWithCountries, getCountries } from "@/services/getAPI";
import { useQuery } from "@tanstack/react-query";
import {
  selectCountry,
  selectCity,
  setData,
  setLocation,
} from "../../slices/dataSlice"; // Import actions
import { Button } from "../ui/button";

const LeftSideBar = () => {
  const dispatch = useDispatch(); // Initialize dispatch to update the Redux store
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
  const [selectedCity, setSelectedCity] = useState<string | undefined>();

  // Fetch countries data
  const { data: countries } = useQuery<any[]>({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  // Fetch cities based on the selected country
  const { data: cities } = useQuery<any[]>({
    queryKey: ["cities", selectedCountry],
    queryFn: () => getCitiesWithCountries(selectedCountry), // Fetch cities based on selected country
    enabled: !!selectedCountry, // Only run the query if a country is selected
  });

  const handleSearch = () => {
    if (selectedCountry) {
      // Dispatch actions when the "Ara" button is pressed
      dispatch(selectCountry(selectedCountry));

      // Find the selected country and dispatch its averageLocation to the Redux store
      const selectedCountryData = countries?.find(
        (country) => country.name === selectedCountry
      );
      if (selectedCountryData?.averageLocation) {
        dispatch(setLocation(selectedCountryData.averageLocation));
      }

      // Set the countries data to redux store
      dispatch(setData(cities));
    }

    if (selectedCity) {
      dispatch(selectCity(selectedCity)); // Set the selected city to redux store
    }
  };

  return (
    <div className="bg-gray-500 min-h-dvh w-[300px] absolute top-0 left-0 flex flex-col z-50 pt-32 items-center gap-8 max-sm:hidden">
      {/* Country selection */}
      <Select
        value={selectedCountry}
        onValueChange={(value) => setSelectedCountry(value)}
      >
        <SelectTrigger className="w-[180px] rounded-sm">
          <SelectValue placeholder="Countries" />
        </SelectTrigger>
        <SelectContent>
          {countries?.map((country) => (
            <SelectItem key={country._id} value={country.name}>
              {country.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* City selection, shown only if a country is selected */}
      {cities?.cities && cities?.cities.length > 0 && (
        <Select
          value={selectedCity}
          onValueChange={(value) => setSelectedCity(value)}
        >
          <SelectTrigger className="w-[180px] rounded-sm">
            <SelectValue placeholder="Cities" />
          </SelectTrigger>
          <SelectContent>
            {cities?.cities?.map((city: any) => (
              <SelectItem key={city._id} value={city.name}>
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* "Ara" button to trigger dispatch actions */}
      <Button onClick={handleSearch}>Ara</Button>
    </div>
  );
};

export default LeftSideBar;
