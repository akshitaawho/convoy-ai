"use client";

import { useEffect, useState } from "react";
import MapView from "./MapView";
import { Stop } from "../types";
import SearchBar from "./SearchBar";
import RouteInfo from "./RouteInfo";
import useRoutePersistence from "../hooks/useRoutePersistence";
import useRouteManager from "../hooks/useRouteManager";

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
  const [routeTitle, setRouteTitle] = useState("");
  const {
    clearRoute,
    generateRoute,
    undoLastStop,
    saveRoute,
  } = useRouteManager({
    stops,
    setStops,
    routePoints,
    setRoutePoints,
    routeDistance,
    setRouteDistance,
    routeDuration,
    setRouteDuration,
    routeGenerated,
    setRouteGenerated,
    routeTitle,
  });

  useRoutePersistence({
    stops,
    routePoints,
    routeDistance,
    routeDuration,
    routeGenerated,
    routeTitle,

    setStops,
    setRoutePoints,
    setRouteDistance,
    setRouteDuration,
    setRouteGenerated,
    setRouteTitle,
  });


  useEffect(() => {
    if (stops.length > 0) {
      setMapCenter([
        stops[0].lat,
        stops[0].lng,
      ]);

      setMapZoom(12);
    }
  }, [stops]);

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

    <MapView
      mapCenter={mapCenter}
      mapZoom={mapZoom}
      stops={stops}
      routePoints={routePoints}
      addStop={addStop}
    />
    
    <RouteInfo
      startStop={startStop}
      endStop={endStop}
      stops={stops}
      routeDistance={routeDistance}
      routeDuration={routeDuration}
      routeGenerated={routeGenerated}
      routeTitle={routeTitle}
      setRouteTitle={setRouteTitle}
      clearRoute={clearRoute}
      undoLastStop={undoLastStop}
      generateRoute={generateRoute}
      saveRoute={saveRoute}
    />
  </>
);
}