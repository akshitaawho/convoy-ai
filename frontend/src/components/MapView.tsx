"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Stop } from "../types";

const convoyIcon = new L.Icon({
  iconUrl: "/markers/location-pin.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function MapClickHandler({
  onMapClick,
}: {
  onMapClick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
}

function ChangeMapCenter({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();

  map.setView(center, zoom);

  return null;
}

type MapViewProps = {
  mapCenter: [number, number];
  mapZoom: number;
  stops: Stop[];
  routePoints: [number, number][];
  addStop: (lat: number, lng: number) => void;
};

export default function MapView({
  mapCenter,
  mapZoom,
  stops,
  routePoints,
  addStop,
}: MapViewProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{
          height: "55vh",
          width: "100%",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ChangeMapCenter
          center={mapCenter}
          zoom={mapZoom}
        />

        <MapClickHandler onMapClick={addStop} />

        {stops.map((stop, index) => (
          <Marker
            key={index}
            position={[stop.lat, stop.lng]}
            icon={convoyIcon}
          >
            <Popup>
              <strong>{stop.name}</strong>
              <br />
              Stop {index + 1}
            </Popup>
          </Marker>
        ))}

        <Polyline positions={routePoints} />
      </MapContainer>
    </div>
  );
}