// import React, { useState } from "react";

// import { FaSearch } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { setData } from "@/slices/dataSlice";
// import { RxHamburgerMenu } from "react-icons/rx";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { setCurrentCity } from "@/slices/searchSlice";
// import { countries } from "@/constants/constants";
// import { Button } from "../ui/button";

// interface City {
//   name: string;
//   lat: number;
//   lng: number;
//   earthquakes: { date: string; magnitude: number }[];
// }

// interface Country {
//   name: string;
//   lat: number;
//   lng: number;
//   cities: City[];
// }

// const Navbar = () => {
//   const [search, setSearch] = useState<string>("");
//   const dispatch = useDispatch();

//   function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
//     setSearch(e.target.value);
//   }

//   function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
//     if (e.key === "Enter") {
//       const trimmedSearch = search.trim();

//       if (trimmedSearch) {
//         const selectedCountry = countries.filter((country) =>
//           country.name.toLowerCase().includes(trimmedSearch.toLowerCase())
//         );

//         dispatch(setData(selectedCountry)); // Seçilen ülkeyi dispatch et
//       }
//     }
//   }

//   const [currentSelectedCountry, setCurrentSelectedCountry] =
//     useState<Country | null>(null);
//   const [selectedCity, setSelectedCity] = useState<City | null>(null);

//   const handleCountryChange = (selectedCountryName: string) => {
//     const selectedCountry = countries.find(
//       (country) => country.name === selectedCountryName
//     );
//     if (selectedCountry) {
//       dispatch(setData([selectedCountry]));
//       setCurrentSelectedCountry(selectedCountry);
//       dispatch(setCurrentCity(null));
//       setSelectedCity(null); // Şehir seçimlerini sıfırla
//       setSearch("");
//     }
//   };

//   const handleCityChange = (selectedCityName: string) => {
//     if (currentSelectedCountry) {
//       const selectedCity = currentSelectedCountry.cities.find(
//         (city: City) => city.name === selectedCityName
//       );

//       if (selectedCity) {
//         setSelectedCity(selectedCity); // Seçilen şehri sakla
//         setSearch(""); // Arama kutusunu temizle
//       }
//     }
//   };

//   const handleButtonClick = () => {
//     if (currentSelectedCountry) {
//       if (selectedCity) {
//         // Hem ülke hem şehir seçiliyse
//         const updatedCountry = {
//           ...currentSelectedCountry,
//           cities: [selectedCity], // Sadece seçilen şehri içeren bir dizi oluştur
//         };
//         dispatch(setData([updatedCountry]));
//         dispatch(setCurrentCity(selectedCity)); // Seçilen şehri dispatch et
//       } else {
//         // Sadece ülke seçiliyse
//         dispatch(setData([currentSelectedCountry]));
//         dispatch(setCurrentCity(null)); // Şehri null yap
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center gap-4 p-8 sticky top-0 left-0 z-50 bg-gray-500">
//       <div className="relative w-full max-w-[650px] flex items-center bg-white rounded-sm px-3">
//         <input
//           type="text"
//           value={search}
//           onChange={handleInputChange}
//           onKeyDown={handleSearch}
//           placeholder="Ülke Arama"
//           className="pl-5 w-full h-12 border-0 shadow-none outline-none focus:outline-none focus:shadow-none focus:ring-0 placeholder-gray-400"
//         />
//         <FaSearch />
//       </div>

//       <Sheet>
//         <SheetTrigger>
//           <RxHamburgerMenu className="h-6 w-6 sm:hidden" />
//         </SheetTrigger>
//         <SheetContent className="flex flex-col items-center gap-4">
//           <Select
//             value={currentSelectedCountry?.name || ""}
//             onValueChange={handleCountryChange}
//           >
//             <SelectTrigger className="w-full rounded-sm mt-5">
//               <SelectValue placeholder="Countries" />
//             </SelectTrigger>
//             <SelectContent>
//               {countries.map((country) => (
//                 <SelectItem key={country.name} value={country.name}>
//                   {country.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           {/* Şehir seçimi, sadece bir ülke seçildiyse göster */}
//           {currentSelectedCountry &&
//             currentSelectedCountry.cities.length > 0 && (
//               <Select
//                 value={selectedCity?.name || ""}
//                 onValueChange={handleCityChange}
//               >
//                 <SelectTrigger className="w-full rounded-sm">
//                   <SelectValue placeholder="Cities" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {currentSelectedCountry.cities.map((city: City) => (
//                     <SelectItem key={city.name} value={city.name}>
//                       {city.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             )}
//           <SheetClose asChild>
//             <Button onClick={handleButtonClick}>Search</Button>
//           </SheetClose>
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// };

// export default Navbar;
