import { Position } from "../../types/types";
import "./leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { getAllEarthQuakes, getCountries } from "@/services/getAPI";

const position: Position = [51.505, -0.09];

type Earthquake = {
  _id: string;
  country: string;
  city: string;
  date: string; // ISO tarih formatı
  magnitude: number;
  depth: number;
  __v: number;
};

const LeafletMap = () => {
  const data = useSelector((state: RootState) => state.data.data);
  console.log(data);
  const selectedCountry = useSelector(
    (state: RootState) => state.data.selectedCountry
  );

  const countryLat = useSelector(
    (state: RootState) => state.data?.location?.latitude
  );
  const countryLng = useSelector(
    (state: RootState) => state.data?.location?.longitude
  );

  const { data: datas } = useQuery<Earthquake[]>({
    queryKey: ["earthquakes"],
    queryFn: getAllEarthQuakes,
  });

  const { data: countries } = useQuery<any[]>({
    queryKey: ["cities", selectedCountry],
    queryFn: getCountries, // Ensure this fetches data correctly
  });

  // Map reference
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (countryLat && countryLng && mapRef.current) {
      mapRef.current.flyTo([countryLat, countryLng], 7, {
        duration: 2,
      });
    }
  }, [countryLat, countryLng]);

  useEffect(() => {
    // Debugging: Check the structure of `countries`
    console.log("Countries Data:", countries);
  }, [countries]);

  return (
    <MapContainer
      ref={mapRef}
      scrollWheelZoom={true}
      center={position}
      zoom={10}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Render markers only if countries data exists and contains cities */}
      {data &&
        data.length > 0 &&
        data.map((city: any) =>
          city.epicenter && city.epicenter.lat && city.epicenter.lng ? (
            <Marker
              key={city._id} // Using _id as a unique key for each marker
              position={[city.epicenter.lat, city.epicenter.lng]}
            >
              <Popup>
                <strong>{city.city}</strong>
                <br />
                Country: {city.country} <br />
                Magnitude: {city.magnitude} <br />
                Depth: {city.depth} km <br />
                Date: {new Date(city.date).toLocaleDateString()}
              </Popup>
            </Marker>
          ) : null
        )}
    </MapContainer>
  );
};

export default LeafletMap;
