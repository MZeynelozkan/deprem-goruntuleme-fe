import { Position } from "../../types/types";
import "./leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const position: Position = [51.505, -0.09];

const LeafletMap = () => {
  const data = useSelector((state: RootState) => state.data.data);

  let cities: any[] = [];
  let countryLat = position[0];
  let countryLng = position[1];

  if (data.length > 0) {
    const [country] = data;
    const { cities: countryCities, lat, lng } = country;
    cities = countryCities;
    countryLat = lat;
    countryLng = lng;
  }

  // Map reference
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo([countryLat, countryLng], 4, {
        duration: 2,
      });
    }
  }, [countryLat, countryLng]);

  return (
    <MapContainer
      ref={mapRef}
      scrollWheelZoom={true}
      center={position}
      zoom={13}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Render markers only if cities exist */}
      {cities?.map((city) => (
        <Marker
          eventHandlers={{
            click: () => {
              const foundCity = data[0].cities.find(
                (c) => c.name === city.name
              );

              const earthquakes = foundCity?.earthquakes;
              console.log("Bulunan şehir:", foundCity);
              console.log(earthquakes);
            },
          }}
          key={city.name}
          position={[city.lat, city.lng]}
        >
          <Popup>
            {city.name} <br /> Latitude: {city.lat}, Longitude: {city.lng}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
