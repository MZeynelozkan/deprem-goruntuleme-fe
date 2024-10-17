/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getCitiesWithCountries,
  getCountries,
  getEarthquakesByScales,
} from "@/services/getAPI";
import { useQuery } from "@tanstack/react-query";
import {
  selectCountry,
  selectCity,
  setData,
  setLocation,
  setScale,
  setScaleDatas,
} from "../../slices/dataSlice";
import { Button } from "../ui/button";
import { scales } from "../../constants/constants";

const LeftSideBar = () => {
  const dispatch = useDispatch();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string | undefined>();
  const [selectedScale, setSelectedScale] = useState<string | undefined>();

  // Fetch countries data
  const { data: countries } = useQuery<any[]>({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  const { refetch } = useQuery<any[]>({
    queryKey: ["byScale"],
    queryFn: () => getEarthquakesByScales(selectedScale),
    enabled: !!selectedScale,
  });

  useEffect(() => {
    if (selectedScale) {
      refetch();
    }
  }, [selectedScale, refetch]);

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
        dispatch(setData([cities]));
        dispatch(setScaleDatas([]));
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

  const handleScaleChange = (value: string) => {
    setSelectedScale(value);
    dispatch(setScale(Number(value))); // Convert the string value to a number
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

      {/* Scale selection */}
      <Select value={selectedScale} onValueChange={handleScaleChange}>
        <SelectTrigger className="w-[180px] rounded-sm">
          <SelectValue placeholder="Select Scale" />
        </SelectTrigger>
        <SelectContent>
          {scales.map((scale) => (
            <SelectItem key={scale} value={scale.toString()}>
              {scale}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* "Search" button */}
      <Button onClick={handleSearch}>Ara</Button>
    </div>
  );
};

export default LeftSideBar;
