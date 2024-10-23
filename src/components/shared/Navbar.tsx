import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCountry } from "@/slices/searchSlice";
import { getCitiesByCountry } from "@/services/getAPI";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "@/store/store";
import { clearSelections, setSearchData } from "@/slices/dataSlice";
import { Link } from "react-router-dom";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const [search, setSearch] = useState<string>("");

  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.search.currentCountry);

  // useQuery ile şehirleri alıyoruz, başlangıçta disabled.
  const { data: country, refetch } = useQuery({
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
        dispatch(setCurrentCountry(trimmedSearch));
        refetch(); // Veriyi refetch ile getir
      }
    }
  }

  // country verisi her değiştiğinde şehirleri Redux'a aktarıyoruz
  useEffect(() => {
    if (country) {
      const cities = country?.cities?.map(
        (city: {
          name: string;
          location: object;
          recentEarthquakes: [];
          _id: string;
        }) => ({
          name: city.name,
          location: city.location,
          recentEarthquakes: city.recentEarthquakes,
          _id: city._id,
        })
      );
      dispatch(setSearchData(cities));
    }
  }, [country, dispatch]);

  return (
    <div className="flex border-2 border-gray-400	 w-full max-w-[1000px] absolute left-1/2 top-5 transform -translate-x-1/2  z-10 rounded-xl items-center justify-between gap-4 py-5 px-7 bg-white">
      <div className="flex items-center space-x-5 max-sm:hidden">
        <img alt="logo" src="/earthquake.png" width={50} height={50} />
        <h1 className="font-extrabold text-3xl text-slate-600">
          Earthquakes Stats
        </h1>
      </div>
      <div className="flex items-center justify-between w-[450px]">
        <Link
          className="text-blue-300 font-bold hover:text-slate-900 max-sm:hidden"
          to="/add-new-country-and-city"
        >
          Veri Ekle
        </Link>
        <div className="relative w-full max-w-[350px] rounded-sm px-3">
          <input
            type="text"
            value={search}
            onChange={handleInputChange}
            onKeyDown={handleSearch}
            placeholder="Ülke Arama"
            className="pl-5 w-full h-12 border rounded-lg shadow-none outline-none focus:outline-none focus:shadow-none focus:ring-0 placeholder-gray-400"
          />
          <FaSearch className="absolute right-7 top-1/2 -translate-y-1/2" />
        </div>
      </div>
      <MobileNavbar />
    </div>
  );
};

export default Navbar;
