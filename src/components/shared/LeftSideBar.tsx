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
  clearSelections,
} from "../../slices/dataSlice";
import { Button } from "../ui/button";

const LeftSideBar = () => {
  const dispatch = useDispatch();
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
  const [selectedCity, setSelectedCity] = useState<string | undefined>();

  // Fetch countries data
  const { data: countries } = useQuery<any[]>({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  // Fetch cities based on the selected country
  const { data: cities } = useQuery<any>({
    queryKey: ["cities", selectedCountry],
    queryFn: () => getCitiesWithCountries(selectedCountry),
    enabled: !!selectedCountry,
  });

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setSelectedCity(undefined); // Reset city selection when the country changes
    dispatch(selectCountry(value));
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    dispatch(selectCity(value));
  };

  const handleSearch = () => {
    if (selectedCountry) {
      if (cities) {
        dispatch(setData([cities])); // cities'i bir dizi olarak Redux'a gönder
      }

      // Find the selected country and set its averageLocation to the Redux store
      const selectedCountryData = countries?.find(
        (country) => country.name === selectedCountry
      );
      if (selectedCountryData?.averageLocation) {
        dispatch(setLocation(selectedCountryData.averageLocation));
      }
    }
  };

  return (
    <div className="bg-gray-500 min-h-dvh w-[300px] absolute top-0 left-0 flex flex-col z-50 pt-32 items-center gap-8 max-sm:hidden">
      {/* Country selection */}
      <Select value={selectedCountry} onValueChange={handleCountryChange}>
        <SelectTrigger className="w-[180px] rounded-sm">
          <SelectValue placeholder="Select Country" />
        </SelectTrigger>
        <SelectContent>
          {countries?.map((country) => (
            <SelectItem key={country._id} value={country.name}>
              {country.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* City selection */}
      {cities && cities.cities && cities.cities.length > 0 && (
        <Select value={selectedCity} onValueChange={handleCityChange}>
          <SelectTrigger className="w-[180px] rounded-sm">
            <SelectValue placeholder="Select City" />
          </SelectTrigger>
          <SelectContent>
            {cities.cities.map((city: any) => (
              <SelectItem key={city._id} value={city._id}>
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* "Search" button */}
      <Button onClick={handleSearch}>Ara</Button>
    </div>
  );
};

export default LeftSideBar;
