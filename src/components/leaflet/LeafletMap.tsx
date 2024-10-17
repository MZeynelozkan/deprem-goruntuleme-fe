/* eslint-disable @typescript-eslint/no-explicit-any */
import { Position } from "../../types/types";
import "./leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { getCountries } from "@/services/getAPI";
import { setCountries } from "@/slices/dataSlice";

const position: Position = [51.505, -0.09];

const LeafletMap = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data.data);
  const scaleDatas = useSelector((state: RootState) => state.data.scaleDatas);
  const selectedCountry = useSelector(
    (state: RootState) => state.data.selectedCountry
  );
  const selectedCity = useSelector(
    (state: RootState) => state.data.selectedCity
  ); // Değişiklik burada

  const { isLoading, data: countries } = useQuery<any[]>({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  useEffect(() => {
    if (!isLoading && countries) {
      // Burada loading kontrolü yapıldı
      console.log("countries", countries);
      dispatch(setCountries(countries));
    }
  }, [isLoading, countries, dispatch]); // Dependencies eklendi

  console.log("selected city", selectedCity);
  console.log("data", data);
  console.log("selectedCountry", selectedCountry);

  const countryLat = useSelector(
    (state: RootState) => state.data?.location?.latitude
  );
  const countryLng = useSelector(
    (state: RootState) => state.data?.location?.longitude
  );

  // Map reference
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (countryLat && countryLng && mapRef.current) {
      mapRef.current.flyTo([countryLat, countryLng], 7, {
        duration: 2,
      });
    }
  }, [countryLat, countryLng]);

  if (scaleDatas) {
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
        {scaleDatas.map((scaleData) => (
          <Marker
            key={scaleData._id}
            position={[scaleData?.epicenter?.lat, scaleData?.epicenter?.lng]}
          >
            <Popup key={scaleData._id}>
              {/* You can add content for the Popup here */}
              <span>{`Magnitude: ${scaleData.magnitude}`}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    );
  }

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

      {data?.map((country) =>
        country?.cities
          ?.filter((city) => city._id === selectedCity)
          .map(
            (
              city // Burada selectedCity._id kullanıldı
            ) => (
              <Marker
                // Her Marker için benzersiz bir anahtar ekle
                position={[city?.location?.latitude, city?.location.longitude]} // location yerine doğrudan lat ve lng kullanıldı
              >
                <Popup>
                  {city?.recentEarthquakes?.map(
                    (e: { date: string; depth: number; magnitude: number }) => (
                      <>
                        <p>Tarih: {e.date}</p>
                        <p>Derinlik: {e.depth}</p>
                        <p>Siddet: {e.magnitude}</p>
                      </>
                    )
                  )}
                </Popup>
              </Marker>
            )
          )
      )}
    </MapContainer>
  );
};

export default LeafletMap;
