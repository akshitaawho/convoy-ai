"use client";

import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { Stop } from "../types";
import SearchBar from "./SearchBar";

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
  zoom:number;
}) {
  const map = useMap();

  map.setView(center, zoom);

  return null;
}

export default function Map() {
  const [stops, setStops] = useState<Stop[]>([]);
  const [routePoints, setRoutePoints] = useState<[number, number][]>([]);
  const [searchText, setSearchText] = useState("");
  const [mapCenter, setMapCenter] =
    useState<[number, number]>([24.4539, 54.3773]);
  const startStop = stops[0];
  const endStop = stops[stops.length - 1];
  const [routeGenerated, setRouteGenerated] = useState(false);
  const [mapZoom, setMapZoom] = useState(10);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  // add new stop while keeping previously selected stops
  function addStop(lat: number, lng: number) {
    setStops((prev) => [
      ...prev,
      { lat, lng },
    ]);

    setRouteGenerated(false);
  }

  // to clear the created route, clearRoute button added in Selected Stops div
  // React updates the UI automatically, when the when stops become an empty array, markers, route lines and stop list dissapears.
  function clearRoute() {
    setStops([]);
    setRoutePoints([]);
    setRouteGenerated(false);
  }

  // generates route when generate route button is clicked
  async function generateRoute() {
    console.log("Generating route...");

    if (stops.length < 2) {
      alert("Select at least 2 stops");
      return;
    }

    const response = await fetch("/api/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stops,
      }),
    });

    const data = await response.json();

    console.log(data);

    const coordinates =
      data.routes[0].geometry.coordinates;

    const route = coordinates.map(
      ([lng, lat]: [number, number]) =>
        [lat, lng] as [number, number]
    );

    setRoutePoints(route);

    setRouteGenerated(true);
  }

  // calculates distance between two stop points
  function calculateDistance() {
    let total = 0;

    for (let i = 1; i < stops.length; i++) {
      const lat1 = stops[i - 1].lat;
      const lng1 = stops[i - 1].lng;

      const lat2 = stops[i].lat;
      const lng2 = stops[i].lng;

      const dx = lat2 - lat1;
      const dy = lng2 - lng1;

      total += Math.sqrt(dx * dx + dy * dy);
    }

    return total;
  }

  // undos the previous stop
  function undoLastStop() {
    setStops((prev) => prev.slice(0, -1));

    setRoutePoints((prev) => prev.slice(0, -1));
  }

  async function searchLocation() {
    console.log("Searching for:", searchText);

    const response = await fetch(
      `/api/suggestions?q=${encodeURIComponent(searchText)}`
    );

    const data = await response.json();

    console.log(data);

    if (data.length > 0) {
      const lat = Number(data[0].lat);
      const lon = Number(data[0].lon);

      setMapCenter([lat, lon]);
      setMapZoom(16);
    }
  }

  async function getSuggestions(text: string) {
    console.log("Suggestions for:", text);

    if (text.length < 2) {
      setSuggestions([]);
      return;
    }

    const response = await fetch(
    `/api/suggestions?q=${encodeURIComponent(text)}`
  )

    const data = await response.json();

    console.log(data);

    setSuggestions(data.slice(0, 5));
    console.log("Suggestions loaded:", data.slice(0, 5));
  }

  function selectSuggestion(place: any) {
    const lat = Number(place.lat);
    const lon = Number(place.lon);

    setMapCenter([lat, lon]);
    setMapZoom(16);

    setSearchText(place.display_name);

    setSuggestions([]);
  }

  return (
  <>

    <SearchBar
      searchText={searchText}
      setSearchText={setSearchText}
      searchLocation={searchLocation}
      getSuggestions={getSuggestions}
      suggestions={suggestions}
      selectSuggestion={selectSuggestion}
    />
    
    <MapContainer
      center={mapCenter}
      zoom={mapZoom}
      style={{
        height: "500px",
        width: "100%",
      }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ChangeMapCenter
        center={mapCenter}
        zoom={mapZoom}
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
      {startStop && (
        <p>
          <strong>Start:</strong>{" "}
          {startStop.lat.toFixed(4)},
          {startStop.lng.toFixed(4)}
        </p>
      )}

      {endStop && (
        <p>
          <strong>End:</strong>{" "}
          {endStop.lat.toFixed(4)},
          {endStop.lng.toFixed(4)}
        </p>
      )}

      <h2>Selected Stops ({stops.length})</h2>

      {stops.map((stop, index) => (
        <p key={index}>
          {index + 1}. {stop.lat.toFixed(4)}, {stop.lng.toFixed(4)}
        </p>
      ))}

      <p>
        Route Length: {calculateDistance().toFixed(4)} units
      </p>

      <p>
        Route Status: {routeGenerated ? "Generated" : "Not Generated"}
      </p>

      <button onClick={clearRoute}>
        Clear Route
      </button>

      {" "}

      <button onClick={undoLastStop}>
        Undo Last Stop
      </button>

      {" "}

      <button onClick={generateRoute}>
        Generate Route
      </button>
    </div>
  </>
);
}