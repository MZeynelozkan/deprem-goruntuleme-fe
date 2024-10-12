import { useMapEvent } from "react-leaflet";

const LeafletMapSmooth = () => {
  const map = useMapEvent("click", (e) => {
    console.log(e.latlng);
    const { lat, lng } = e.latlng;
    map.setView([lat, lng], map.getZoom());
  });
  return null;
};

export default LeafletMapSmooth;
