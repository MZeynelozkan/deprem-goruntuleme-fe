/* eslint-disable @typescript-eslint/no-explicit-any */
import { Position } from "../../types/types";
import "./leaflet.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { getCountries } from "@/services/getAPI";
import { setChartData, setCountries, setSearchData } from "@/slices/dataSlice";
import { setId } from "@/slices/searchSlice";
import { Icon } from "leaflet";

interface City {
  name: string;
  location: object;
  recentEarthquakes: [];
  _id: string;
}

const position: Position = [51.505, -0.09];

const LeafletMap = () => {
  const newIcon = new Icon({
    iconUrl: "/earthquake.png",
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
  const selectedCity = useSelector(
    (state: RootState) => state.data.selectedCity
  );

  const id = useSelector((state: RootState) => state.search._id);

  const [ids, setIds] = useState("");

  const searchCityDatas = useSelector(
    (state: RootState) => state.data.searchCityDatas
  );

  const nationName = useSelector(
    (state: RootState) => state.search.currentCountry
  );

  const { isLoading, data: countries } = useQuery<any[]>({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  const {
    data: country,
    refetch,
    isLoading: isLoadingCountry,
  } = useQuery<City[]>({
    queryKey: ["cities", nationName],
    enabled: !!id,
  });

  useEffect(() => {
    dispatch(setId(ids));
    refetch();
  }, [id, refetch, dispatch, ids]);

  console.log(country?.cities, "country cities");

  useEffect(() => {
    if (!isLoadingCountry) {
      if (country) {
        const cities = country?.cities?.map((city: City) => ({
          name: city.name,
          location: city.location,
          recentEarthquakes: city.recentEarthquakes,
          _id: city._id,
        }));
        dispatch(setSearchData(cities));
      }
    }
  }, [country, dispatch, isLoadingCountry]);

  useEffect(() => {
    if (!isLoading && countries) {
      console.log("countries", countries);
      dispatch(setCountries(countries));
    }
  }, [isLoading, countries, dispatch]);

  console.log("selected city", selectedCity);
  console.log("data", data);
  console.log("selectedCountry", selectedCountry);

  const countryLat = useSelector(
    (state: RootState) => state.data?.location?.latitude
  );
  const countryLng = useSelector(
    (state: RootState) => state.data?.location?.longitude
  );

  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (countryLat && countryLng && mapRef.current) {
      mapRef.current.flyTo([countryLat, countryLng], 7, {
        duration: 2,
      });
    }
  }, [countryLat, countryLng]);

  const handleChangeChartDataByClickingMarker = useCallback(
    (city_id: string) => {
      const currentChartData = searchCityDatas?.filter(
        (city) => city._id === city_id
      );

      if (currentChartData && currentChartData.length > 0) {
        const recentEarthquakes = currentChartData[0]?.recentEarthquakes;

        if (recentEarthquakes) {
          dispatch(setChartData(recentEarthquakes));
        } else {
          console.error("No earthquake data found for the selected city.");
        }
      } else {
        console.error("City data not found for the given city_id:", city_id);
      }
    },
    [searchCityDatas, dispatch]
  );

  useEffect(() => {
    if (id) {
      handleChangeChartDataByClickingMarker(id);
    }
  }, [id, handleChangeChartDataByClickingMarker]);

  // Custom MapClickHandler to reset city selection on map click
  const MapClickHandler = () => {
    useMapEvents({
      click: () => {
        dispatch(setId(""));
        dispatch(setChartData([]));
      },
    });
    return null;
  };

  if (searchCityDatas && searchCityDatas.length > 0 && !selectedCity) {
    return (
      <MapContainer
        ref={mapRef}
        scrollWheelZoom={true}
        center={position}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <MapClickHandler />{" "}
        {/* Add click handler for resetting city selection */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {searchCityDatas.map((city) => (
          <Marker
            icon={newIcon}
            eventHandlers={{
              click: () => {
                setIds(city._id);
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
        <MapClickHandler />{" "}
        {/* Add click handler for resetting city selection */}
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
      <MapClickHandler /> {/* Add click handler for resetting city selection */}
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
                  setIds(city._id);
                  handleChangeChartDataByClickingMarker(city._id);
                  dispatch(setId(city._id));
                },
              }}
              position={[city?.location?.latitude, city?.location?.longitude]}
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
