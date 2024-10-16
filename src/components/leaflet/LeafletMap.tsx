import { Position } from "../../types/types";
import "./leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { getAllEarthQuakes } from "@/services/getAPI";

const position: Position = [51.505, -0.09];

const LeafletMap = () => {
  const data = useSelector((state: RootState) => state.data.data);

  const { data: datas } = useQuery({
    queryKey: ["earthquakes"],
    queryFn: getAllEarthQuakes,
  });

  console.log(datas);

  let cities: any[] = [];
  let countryLat = position[0];
  let countryLng = position[1];

  if (data && data.length === 1) {
    cities = data;
  }

  // Defensive check: Ensure 'data' and 'data[0]' exist before accessing properties
  if (data && data.length > 0) {
    const [country] = data;
    const { cities: countryCities, lat, lng } = country;

    // Only assign if cities exist
    if (countryCities && Array.isArray(countryCities)) {
      cities = countryCities;
    }

    // Handle fallback if lat or lng are undefined
    countryLat = lat || country.lat || position[0];
    countryLng = lng || country.lng || position[1];

    console.log(countryLat, countryLng);
  }

  // Map reference
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo([countryLat, countryLng], 7, {
        duration: 2,
      });
    }
  }, [countryLat, countryLng]);

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
      {/* Render markers only if datas exist */}
      {datas &&
        datas.length > 0 &&
        datas.map((city) => (
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
        ))}
    </MapContainer>
  );
};

export default LeafletMap;
