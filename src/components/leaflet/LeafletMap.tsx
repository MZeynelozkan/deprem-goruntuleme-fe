import { Position } from "../../types/types";
import "./leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import LocationMarker from "./LocationMarker";
import LeafletMapSmooth from "./LeafletMapSmooth";
import { useState } from "react";

const position: Position = [51.505, -0.09];

const LeafletMap = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <LocationMarker />
      {/* <LeafletMapSmooth /> */}
    </MapContainer>
  );
};

export default LeafletMap;
