import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "../ui/button";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "../ui/sheet";
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
  clearSelections,
} from "../../slices/dataSlice";
import { scales } from "../../constants/constants";

const MobileNavbar = () => {
  const dispatch = useDispatch();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string | undefined>();
  const [selectedScale, setSelectedScale] = useState<string | undefined>();

  // Fetch countries data
  const { data: countriesData } = useQuery<any[]>({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  // Fetch cities based on the selected country
  const { data: cities } = useQuery<any>({
    queryKey: ["cities", selectedCountry],
    queryFn: () => getCitiesWithCountries(selectedCountry),
    enabled: !!selectedCountry,
  });

  // Refetch data when scale changes
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

  const handleCountryChange = (value: string) => {
    dispatch(clearSelections());
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
      const selectedCountryData = countriesData?.find(
        (country) => country.name === selectedCountry
      );
      if (selectedCountryData?.averageLocation) {
        dispatch(setLocation(selectedCountryData.averageLocation));
      }
    }
  };

  const handleScaleChange = (value: string) => {
    dispatch(clearSelections());
    setSelectedScale(value);
    dispatch(setScale(Number(value))); // Convert the string value to a number
  };

  return (
    <Sheet>
      <SheetTrigger>
        <RxHamburgerMenu className="h-6 w-6 sm:hidden" />
      </SheetTrigger>
      <SheetContent className="flex flex-col items-center gap-4 p-4">
        <SheetTitle>Country, City, and Scale Selection</SheetTitle>
        <SheetDescription>
          Select a country, city, and scale for the search
        </SheetDescription>

        {/* Country selection */}
        <Select value={selectedCountry} onValueChange={handleCountryChange}>
          <SelectTrigger className="w-full rounded-sm mt-5">
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            {countriesData?.map((country) => (
              <SelectItem key={country._id} value={country.name}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* City selection */}
        {cities && cities.cities && cities.cities.length > 0 && (
          <Select value={selectedCity} onValueChange={handleCityChange}>
            <SelectTrigger className="w-full rounded-sm">
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
          <SelectTrigger className="w-full rounded-sm">
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
        <SheetClose asChild>
          <Button onClick={handleSearch}>Search</Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
