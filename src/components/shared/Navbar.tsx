import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCity } from "@/slices/searchSlice";
import { getCitiesByCountry } from "@/services/getAPI";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "@/store/store";
import { clearSelections, setSearchData } from "@/slices/dataSlice";

const Navbar = () => {
  const [search, setSearch] = useState<string>("");

  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.search.currentCountry);

  // useQuery ile şehirleri alıyoruz, başlangıçta disabled.
  const {
    data: country,
    refetch,
    isLoading,
  } = useQuery<any>({
    queryKey: ["cities", data],
    queryFn: () => getCitiesByCountry(search),
  });

  // Search input değişimini yönetiyoruz
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  // Enter tuşuna basıldığında arama yapılıyor
  async function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      dispatch(clearSelections());
      const trimmedSearch: string = search.trim();
      if (trimmedSearch) {
        dispatch(setCurrentCity(trimmedSearch));
        refetch(); // Veriyi refetch ile getir
      }
    }
  }

  // country verisi her değiştiğinde şehirleri Redux'a aktarıyoruz
  useEffect(() => {
    if (country) {
      const cities = country?.cities?.map((city: any) => ({
        name: city.name,
        location: city.location,
        recentEarthquakes: city.recentEarthquakes,
        _id: city._id,
      }));
      dispatch(setSearchData(cities));
    }
  }, [country, dispatch]); // country değiştiğinde bu effect çalışır

  return (
    <div className="flex items-center justify-center gap-4 p-8 sticky top-0 left-0 z-50 bg-gray-500">
      <div className="relative w-full max-w-[650px] flex items-center bg-white rounded-sm px-3">
        <input
          type="text"
          value={search}
          onChange={handleInputChange}
          onKeyDown={handleSearch}
          placeholder="Ülke Arama"
          className="pl-5 w-full h-12 border-0 shadow-none outline-none focus:outline-none focus:shadow-none focus:ring-0 placeholder-gray-400"
        />
        <FaSearch />
      </div>
    </div>
  );
};

export default Navbar;
