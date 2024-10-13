import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setData } from "@/slices/dataSlice";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setCurrentCity } from "@/slices/searchSlice";
import { countries } from "@/constants/constants";

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

const Navbar = () => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const trimmedSearch = search.trim();

      if (trimmedSearch) {
        const selectedCountry = countries.filter((country) =>
          country.name.toLowerCase().includes(trimmedSearch.toLowerCase())
        );

        dispatch(setData(selectedCountry)); // Seçilen ülkeyi dispatch et
      }
    }
  }

  const [currentSelectedCountry, setCurrentSelectedCountry] =
    useState<Country | null>(null);

  const handleCountryChange = (selectedCountryName: string) => {
    const selectedCountry = countries.find(
      (country) => country.name === selectedCountryName
    );
    if (selectedCountry) {
      dispatch(setData([selectedCountry]));
      setCurrentSelectedCountry(selectedCountry);
      dispatch(setCurrentCity(null));
      setSearch("");
    }
  };
  const handleCityChange = (selectedCityName: string) => {
    if (currentSelectedCountry) {
      const selectedCity = currentSelectedCountry.cities.find(
        (city: City) => city.name === selectedCityName
      );

      if (selectedCity) {
        // Burada mevcut ülkenin içinde yalnızca seçilen şehri tutan yeni bir obje oluşturuyoruz
        const updatedCountry = {
          ...currentSelectedCountry,
          cities: [selectedCity], // Sadece seçilen şehri içeren bir dizi oluştur
        };

        // Şehir ve ülke verisini dispatch et
        dispatch(setData([updatedCountry])); // Ülkenin tüm verisini setData'ya gönder
        dispatch(setCurrentCity(selectedCity)); // Mevcut şehri güncelle
        setSearch(""); // Arama kutusunu temizle
      }
    }
  };

  // Toggle the state when clicking on the SheetTrigger

  return (
    <div className="flex items-center justify-center gap-4 p-8 sticky top-0 left-0 z-50 bg-red-500">
      <div className="relative w-full max-w-[550px] flex items-center">
        <FaSearch className="absolute top-1/2 right-4 -translate-y-1/2" />
        <Input
          type="text"
          value={search}
          onChange={handleInputChange}
          onKeyDown={handleSearch}
          placeholder="Ülke Arama"
          className="pl-5 w-full border-none h-[48px]"
        />
      </div>

      <Sheet>
        <SheetTrigger>
          <RxHamburgerMenu className="h-6 w-6 sm:hidden" />
        </SheetTrigger>
        <SheetContent>
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

          {/* Şehir seçimi, sadece bir ülke seçildiyse göster */}
          {currentSelectedCountry &&
            currentSelectedCountry.cities.length > 0 && (
              <Select onValueChange={handleCityChange}>
                <SelectTrigger className="w-[180px] rounded-sm">
                  <SelectValue placeholder="Cities" />
                </SelectTrigger>
                <SelectContent>
                  {currentSelectedCountry.cities.map((city: City) => (
                    <SheetClose>
                      <SelectItem key={city.name} value={city.name}>
                        {city.name}
                      </SelectItem>
                    </SheetClose>
                  ))}
                </SelectContent>
              </Select>
            )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navbar;
