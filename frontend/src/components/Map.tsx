"use client";

import { useEffect, useState } from "react";
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
import { Stop } from "../types";
import SearchBar from "./SearchBar";
import RouteInfo from "./RouteInfo";

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
  const [routeDistance, setRouteDistance] = useState(0);
  const [routeDuration, setRouteDuration] = useState(0);

// real-time location
useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setMapCenter([
        position.coords.latitude,
        position.coords.longitude,
      ]);

      setMapZoom(15);
    },
    (error) => {
      console.log("Location access denied", error);
    }
  );
}, []);

  // add new stop while keeping previously selected stops
  async function addStop(lat: number, lng: number) {
    const response = await fetch(
      `/api/reverse-geocode?lat=${lat}&lon=${lng}`
    );

    const data = await response.json();

    const placeName =
      data.name ||
      data.display_name ||
      `Stop ${stops.length + 1}`;

    setStops((prev) => [
      ...prev,
      {
        lat,
        lng,
        name: placeName,
      },
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

    setRouteDistance(data.routes[0].distance);
    setRouteDuration(data.routes[0].duration);

    const coordinates =
      data.routes[0].geometry.coordinates;

    const route = coordinates.map(
      ([lng, lat]: [number, number]) =>
        [lat, lng] as [number, number]
    );

    setRoutePoints(route);

    setRouteGenerated(true);
  }

  // undos the previous stop
  async function undoLastStop() {
    const updatedStops = stops.slice(0, -1);

    setStops(updatedStops);

    if (updatedStops.length < 2) {
      setRoutePoints([]);
      setRouteDistance(0);
      setRouteDuration(0);
      setRouteGenerated(false);
      return;
    }

    const response = await fetch("/api/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stops: updatedStops,
      }),
    });

    const data = await response.json();

    const coordinates =
      data.routes[0].geometry.coordinates;

    const route = coordinates.map(
      ([lng, lat]: [number, number]) =>
        [lat, lng] as [number, number]
    );

    setRoutePoints(route);

    setRouteDistance(data.routes[0].distance);

    setRouteDuration(data.routes[0].duration);

    setRouteGenerated(true);
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
      `/api/suggestions?q=${encodeURIComponent(text)}&lat=${mapCenter[0]}&lon=${mapCenter[1]}`
    )

    const data = await response.json();

    console.log(data);

    setSuggestions(data.slice(0, 5));
    console.log("Suggestions loaded:", data.slice(0, 5));
  }

  async function selectSuggestion(place: any) {
    const lat = Number(place.lat);
    const lon = Number(place.lon);

    setMapCenter([lat, lon]);
    setMapZoom(16);

    setSearchText(place.display_name);

    setSuggestions([]);

    setStops((prev) => [
      ...prev,
      {
        lat,
        lng: lon,
        name:
          place.name ||
          place.display_name,
      },
    ]);

    setRouteGenerated(false);
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
      mapCenter={mapCenter}
    />

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
          >
            <Popup>
              <strong>{stop.name}</strong>
              <br />
              Stop {index + 1}
            </Popup>
          </Marker>
        ))}

        {/* creates lines from point A to point B visually*/}
        <Polyline
          positions={routePoints}
        />
      </MapContainer>
    </div>
    
    <RouteInfo
      startStop={startStop}
      endStop={endStop}
      stops={stops}
      routeDistance={routeDistance}
      routeDuration={routeDuration}
      routeGenerated={routeGenerated}
      clearRoute={clearRoute}
      undoLastStop={undoLastStop}
      generateRoute={generateRoute}
    />
  </>
);
}