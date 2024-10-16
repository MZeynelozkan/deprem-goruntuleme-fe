import { countries } from "@/constants/constants";
import { setData } from "@/slices/dataSlice";
import { setCurrentCity, setSearch } from "@/slices/searchSlice";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";

import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Button } from "../ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "../ui/sheet";
import { useDispatch } from "react-redux";

interface City {
  name: string;
  lat: number;
  lng: number;
  earthquakes: { date: string; magnitude: number }[];
}

interface Country {
  name: string;
  lat: number;
  lng: number;
  cities: City[];
}

const MobileNavbar = () => {
  const dispatch = useDispatch();

  const [currentSelectedCountry, setCurrentSelectedCountry] =
    useState<Country | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const handleCountryChange = (selectedCountryName: string) => {
    const selectedCountry = countries.find(
      (country) => country.name === selectedCountryName
    );
    if (selectedCountry) {
      dispatch(setData([selectedCountry]));
      setCurrentSelectedCountry(selectedCountry);
      dispatch(setCurrentCity(null));
      setSelectedCity(null); // Şehir seçimlerini sıfırla
      setSearch("");
    }
  };

  const handleCityChange = (selectedCityName: string) => {
    if (currentSelectedCountry) {
      const selectedCity = currentSelectedCountry.cities.find(
        (city: City) => city.name === selectedCityName
      );

      if (selectedCity) {
        setSelectedCity(selectedCity); // Seçilen şehri sakla
        setSearch(""); // Arama kutusunu temizle
      }
    }
  };

  const handleButtonClick = () => {
    if (currentSelectedCountry) {
      if (selectedCity) {
        // Hem ülke hem şehir seçiliyse
        const updatedCountry = {
          ...currentSelectedCountry,
          cities: [selectedCity], // Sadece seçilen şehri içeren bir dizi oluştur
        };
        dispatch(setData([updatedCountry]));
        dispatch(setCurrentCity(selectedCity)); // Seçilen şehri dispatch et
      } else {
        // Sadece ülke seçiliyse
        dispatch(setData([currentSelectedCountry]));
        dispatch(setCurrentCity(null)); // Şehri null yap
      }
    }
  };
  return (
    <Sheet>
      <SheetTrigger>
        <RxHamburgerMenu className="h-6 w-6 sm:hidden" />
      </SheetTrigger>
      <SheetContent className="flex flex-col items-center gap-4">
        <Select
          value={currentSelectedCountry?.name || ""}
          onValueChange={handleCountryChange}
        >
          <SelectTrigger className="w-full rounded-sm mt-5">
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

        {/* Şehir seçimi, sadece bir ülke seçildiyse göster */}
        {currentSelectedCountry && currentSelectedCountry.cities.length > 0 && (
          <Select
            value={selectedCity?.name || ""}
            onValueChange={handleCityChange}
          >
            <SelectTrigger className="w-full rounded-sm">
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
        <SheetClose asChild>
          <Button onClick={handleButtonClick}>Search</Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
