import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { useQuery } from "@tanstack/react-query";

import { reverseGeocoding } from "@/services/getAPI";
import { LatLngTuple } from "leaflet";

// reverseGeocoding fonksiyonu

function LocationMarker() {
  const [position, setPosition] = useState<LatLngTuple | null>(null);
  const [clickedLatLng, setClickedLatLng] = useState<LatLngTuple | null>(null);

  const map = useMapEvents({
    click(e) {
      // Tıklanan konumun lat/lng değerlerini set et
      const latLngTuple: LatLngTuple = [e.latlng.lat, e.latlng.lng]; // LatLngTuple olarak ayarlama
      setClickedLatLng(latLngTuple);
      setPosition(latLngTuple);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  console.log(position, clickedLatLng);

  // useQuery ile reverseGeocoding fonksiyonunu çağırıyoruz
  const { data, isError, isLoading } = useQuery({
    queryKey: ["reverseGeocoding", clickedLatLng],
    queryFn: () =>
      clickedLatLng
        ? reverseGeocoding(clickedLatLng[0], clickedLatLng[1]) // LatLngTuple'dan erişim
        : null,
    enabled: !!clickedLatLng,
  });

  return clickedLatLng === null ? null : (
    <>
      <Marker position={clickedLatLng}>
        <Popup>
          Latitude: {clickedLatLng[0]}, Longitude: {clickedLatLng[1]}{" "}
          {/* LatLngTuple'dan erişim */}
          {isLoading && <p>Loading location...</p>}
          {isError && <p>Error fetching location</p>}
          {data && (
            <>
              <p>Country: {data.features[0].properties.country}</p>
              <p>City: {data.features[0].properties.city}</p>
              <p>Address: {data.features[0].properties.formatted}</p>
            </>
          )}
        </Popup>
      </Marker>
    </>
  );
}

const LeafMapReverseGeoCoding = () => {
  return (
    <MapContainer
      center={{ lat: 51.505, lng: -0.09 }}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default LeafMapReverseGeoCoding;
