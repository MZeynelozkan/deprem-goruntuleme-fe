import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/constants/constants";
import { countriesType } from "@/types/types";
import { useState } from "react";

const LeftSideBar = () => {
  // Ülke obje olarak saklanıyor
  const [currentSelectedCountry, setCurrentSelectedCountry] = useState<
    countriesType | undefined
  >(countries[0]);

  return (
    <div className="bg-red-500 min-h-dvh w-[300px] absolute top-0 left-0 flex flex-col z-50 pt-32 items-center gap-8">
      {/* Ülke seçimi */}
      <Select
        onValueChange={(value) => {
          const selectedCountry = countries.find(
            (country) => country.name === value
          );
          setCurrentSelectedCountry(selectedCountry);
        }}
      >
        <SelectTrigger className="w-[180px] rounded-sm">
          <SelectValue
            defaultValue={currentSelectedCountry?.name}
            placeholder="Countries"
          />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.name} value={country.name}>
              {country.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Şehir seçimi */}
      <Select>
        <SelectTrigger className="w-[180px] rounded-sm">
          <SelectValue
            defaultValue={currentSelectedCountry?.cities[0]}
            placeholder="Cities"
          />
        </SelectTrigger>
        <SelectContent>
          {currentSelectedCountry?.cities.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LeftSideBar;
