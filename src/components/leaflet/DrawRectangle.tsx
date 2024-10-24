import {
  MapContainer,
  TileLayer,
  Rectangle,
  useMapEvents,
  Marker,
} from "react-leaflet";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRectangleCities, setSearchData } from "@/slices/dataSlice";
import { useNavigate } from "react-router";

const SelectArea = ({ setBounds, bounds, setRectangleComplete }) => {
  useMapEvents({
    click(e) {
      // İlk tıklamada koordinatları başlat
      if (!bounds) {
        console.log("İlk tıklama: ", e.latlng); // İlk tıklama koordinatlarını yazdır
        setBounds([e.latlng, e.latlng]);
      } else {
        // İkinci tıklamada dikdörtgeni tamamla
        console.log("İkinci tıklama: ", e.latlng); // İkinci tıklama koordinatlarını yazdır
        setBounds([bounds[0], e.latlng]);
        setRectangleComplete(true); // Dikdörtgen tamamlandı
      }
    },
  });

  return null;
};

const DrawRectangle = ({ cities }) => {
  const [bounds, setBounds] = useState(null); // Dikdörtgenin sınırları
  const [rectangleComplete, setRectangleComplete] = useState(false); // Dikdörtgen tamamlandı mı?
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (bounds) {
      console.log("Dikdörtgen sınırları: ", bounds); // Sınırları konsola yazdır
    }
  }, [bounds]);

  // Dikdörtgenin sınırları içerisinde kalan şehirleri filtreleme
  const filteredCities = cities?.filter((city) => {
    if (!bounds || !rectangleComplete) return false;

    const [corner1, corner2] = bounds;

    const minLat = Math.min(corner1.lat, corner2.lat);
    const maxLat = Math.max(corner1.lat, corner2.lat);
    const minLng = Math.min(corner1.lng, corner2.lng);
    const maxLng = Math.max(corner1.lng, corner2.lng);

    const cityInBounds =
      city.location.latitude >= minLat &&
      city.location.latitude <= maxLat &&
      city.location.longitude >= minLng &&
      city.location.longitude <= maxLng;

    console.log(`Şehir: ${city.name}, Sınırda mı?: ${cityInBounds}`); // Şehirlerin dikdörtgen içinde olup olmadığını kontrol et
    return cityInBounds;
  });

  useEffect(() => {
    if (rectangleComplete) {
      console.log("Tamamlanan Dikdörtgen İçindeki Şehirler: ", filteredCities); // Filtrelenen şehirleri yazdır
      dispatch(setRectangleCities(filteredCities));
      navigate("/");
    }
  }, [rectangleComplete, filteredCities, dispatch, navigate]);

  return (
    <MapContainer
      center={[39.9334, 32.8597]}
      zoom={6}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
      />

      {/* Seçilen dikdörtgenin sınırlarını çiz */}
      {bounds && rectangleComplete && (
        <Rectangle bounds={bounds} pathOptions={{ color: "blue" }} />
      )}

      {/* Dikdörtgen içerisindeki şehirleri marker olarak göster */}
      {filteredCities?.map((city) => (
        <Marker
          key={city.name}
          position={[city.location.latitude, city.location.longitude]}
        />
      ))}

      {/* Dikdörtgen alanını belirlemek için dinleyici */}
      <SelectArea
        setBounds={setBounds}
        bounds={bounds}
        setRectangleComplete={setRectangleComplete}
      />
    </MapContainer>
  );
};

export default DrawRectangle;
