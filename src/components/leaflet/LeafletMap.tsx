/* eslint-disable @typescript-eslint/no-explicit-any */
import { Position } from "../../types/types";
import "./leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { getCountries } from "@/services/getAPI";
import { setChartData, setCountries } from "@/slices/dataSlice";
import { setId } from "@/slices/searchSlice";

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

  const searchCityDatas = useSelector(
    (state: RootState) => state.data.searchCityDatas
  );

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

  function handleChangeChartDataByClickingMarker(city_id: string) {
    // Find the selected city by ID from searchCityDatas
    const currentChartData = searchCityDatas?.filter(
      (city) => city._id === city_id
    );

    // Check if we have valid data for the selected city
    if (currentChartData && currentChartData.length > 0) {
      const recentEarthquakes = currentChartData[0]?.recentEarthquakes;

      // Ensure recentEarthquakes is available before dispatching
      if (recentEarthquakes) {
        dispatch(setChartData(recentEarthquakes));
      } else {
        console.error("No earthquake data found for the selected city.");
      }
    } else {
      console.error("City data not found for the given city_id:", city_id);
    }
  }
  if (searchCityDatas && searchCityDatas.length > 0 && !selectedCity) {
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
        {searchCityDatas.map((city) => (
          <Marker
            eventHandlers={{
              click: () => {
                handleChangeChartDataByClickingMarker(city._id);
                dispatch(setId(city._id));
              },
            }}
            key={city._id}
            position={[city?.location?.latitude, city?.location?.longitude]}
          >
            <Popup key={city._id}>{city.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    );
  }

  if (scaleDatas && scaleDatas.length > 0) {
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
            eventHandlers={{
              click: () => handleChangeChartDataByClickingMarker(scaleData._id),
            }}
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
          .map((city) => (
            <Marker
              eventHandlers={{
                click: () => {
                  handleChangeChartDataByClickingMarker(city._id);
                  dispatch(setId(city._id));
                },
              }}
              position={[city?.location?.latitude, city?.location?.longitude]} // location yerine doğrudan lat ve lng kullanıldı
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
          ))
      )}
    </MapContainer>
  );
};

export default LeafletMap;
