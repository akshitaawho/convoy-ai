"use client";

import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

type Stop = {
  lat: number;
  lng: number;
};

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

export default function Map() {
  const [stops, setStops] = useState<Stop[]>([]);
  function addStop(lat: number, lng: number) {
    setStops((prev) => [
      ...prev,
      { lat, lng },
    ]);
  }

  return (
  <>
    <MapContainer
      center={[24.4539, 54.3773]}
      zoom={10}
      style={{
        height: "500px",
        width: "100%",
      }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapClickHandler onMapClick={addStop} />

      {stops.map((stop, index) => (
        <Marker
          key={index}
          position={[stop.lat, stop.lng]}
        />
      ))}
    </MapContainer>

    <div>
      <h2>Selected Stops</h2>

      {stops.map((stop, index) => (
        <p key={index}>
          {index + 1}. {stop.lat.toFixed(4)}, {stop.lng.toFixed(4)}
        </p>
      ))}
    </div>
  </>
);
}