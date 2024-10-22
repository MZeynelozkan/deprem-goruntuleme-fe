/* eslint-disable @typescript-eslint/no-explicit-any */
import { Position } from "../../types/types";
import "./leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { getCountries, getEarthquakesById } from "@/services/getAPI";
import { setChartData, setCountries } from "@/slices/dataSlice";
import { setId } from "@/slices/searchSlice";
import { Icon } from "leaflet";

const position: Position = [51.505, -0.09];

interface EarthquakeData {
  date: string;
  depth: number;
  magnitude: number;
  // Add any other properties you expect
}

const LeafletMap = () => {
  const newIcon = new Icon({
    iconUrl: "/among-us.png",
    iconSize: [40, 40],
    iconAnchor: [22, 41],
    popupAnchor: [0, -40],
  });

  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data.data);
  const scaleDatas = useSelector((state: RootState) => state.data.scaleDatas);
  const selectedCountry = useSelector(
    (state: RootState) => state.data.selectedCountry
  );
  const id = useSelector((state: RootState) => state.search._id);

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

  const { data: chartData, refetch } = useQuery<EarthquakeData[]>({
    queryKey: ["earthquake", id],
    queryFn: () => getEarthquakesById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

  useEffect(() => {
    if (!isLoading && countries) {
      // Burada loading kontrolü yapıldı

      dispatch(setCountries(countries));
    }
  }, [isLoading, countries, dispatch]); // Dependencies eklendi

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
    dispatch(setChartData(chartData.recentEarthquakes));
  }

  console.log("chartData", chartData);

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
            icon={newIcon}
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
            icon={newIcon}
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
              icon={newIcon}
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
