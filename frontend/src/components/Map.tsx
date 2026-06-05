"use client";

import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
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
  const [routePoints, setRoutePoints] = useState<[number, number][]>([]);

  // add new stop while keeping previously selected stops
  function addStop(lat: number, lng: number) {
    setStops((prev) => [
      ...prev,
      { lat, lng },
    ]);
  }

  // to clear the created route, clearRoute button added in Selected Stops div
  // React updates the UI automatically, when the when stops become an empty array, markers, route lines and stop list dissapears.
  function clearRoute() {
    setStops([]);
    setRoutePoints([]);
  }

  // generates route when generate route button is clicked
  function generateRoute() {
    console.log("Generating route...");

    setRoutePoints(
      stops.map(stop => [stop.lat, stop.lng] as [number, number])
    );
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

      {/* create a marker for each stop */}
      {stops.map((stop, index) => (
        <Marker
          key={index}
          position={[stop.lat, stop.lng]}
        />
      ))}

      {/* creates lines from point A to point B visually*/}
      <Polyline
        positions={routePoints}
      />
    </MapContainer>

    <div>
      <h2>Selected Stops ({stops.length})</h2>

      {stops.map((stop, index) => (
        <p key={index}>
          {index + 1}. {stop.lat.toFixed(4)}, {stop.lng.toFixed(4)}
        </p>
      ))}

      <button onClick={clearRoute}>
        Clear Route
      </button>

      {" "}

      <button onClick={generateRoute}>
        Generate Route
      </button>
    </div>
  </>
);
}