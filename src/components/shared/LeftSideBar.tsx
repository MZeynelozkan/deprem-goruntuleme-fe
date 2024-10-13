import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/constants/constants";
import { setData } from "@/slices/dataSlice";
import { setCurrentCity, setSearch } from "@/slices/searchSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface City {
  name: string;
  lat: number;
  lng: number;
  earthquakes: { date: string; magnitude: number }[];
}

const LeftSideBar = () => {
  // State to store selected country and city
  const [currentSelectedCountry, setCurrentSelectedCountry] =
    useState<any>(null);
  const dispatch = useDispatch();

  const handleCountryChange = (selectedCountryName: string) => {
    const selectedCountry = countries.find(
      (country) => country.name === selectedCountryName
    );

    if (selectedCountry) {
      dispatch(setData([selectedCountry])); // Ülkeyi bir dizi içine alarak, tutarlılığı sağlıyoruz
      setCurrentSelectedCountry(selectedCountry);
      dispatch(setCurrentCity(null)); // Yeni bir ülke seçildiğinde şehir seçimini sıfırla
      dispatch(setSearch("")); // Aramayı sıfırla
    }
  };

  const handleCityChange = (selectedCityName: string) => {
    // Find selected city and update state
    const selectedCity = currentSelectedCountry?.cities.find(
      (city: City) => city.name === selectedCityName
    );
    dispatch(setCurrentCity(selectedCity)); // Set the selected city in Redux
    dispatch(setSearch("")); // Reset search
    dispatch(setData([selectedCity])); // Dispatch the selected city data for detailed view
  };

  return (
    <div className="bg-gray-500 min-h-dvh w-[300px] absolute top-0 left-0 flex flex-col z-50 pt-32 items-center gap-8 max-sm:hidden">
      {/* Country selection */}
      <Select onValueChange={handleCountryChange}>
        <SelectTrigger className="w-[180px] rounded-sm">
          <SelectValue placeholder="Countries" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.name} value={country.name}>
              {country.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* City selection, shown only if a country is selected */}
      {currentSelectedCountry && currentSelectedCountry.cities?.length > 0 && (
        <Select onValueChange={handleCityChange}>
          <SelectTrigger className="w-[180px] rounded-sm">
            <SelectValue placeholder="Cities" />
          </SelectTrigger>
          <SelectContent>
            {currentSelectedCountry.cities.map((city: City) => (
              <SelectItem key={city.name} value={city.name}>
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default LeftSideBar;
