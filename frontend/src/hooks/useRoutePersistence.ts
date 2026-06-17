import { useEffect, useRef } from "react";
import { Stop } from "../types";

type UseRoutePersistenceProps = {
  stops: Stop[];
  routePoints: [number, number][];
  routeDistance: number;
  routeDuration: number;
  routeGenerated: boolean;

  setStops: React.Dispatch<
    React.SetStateAction<Stop[]>
  >;

  setRoutePoints: React.Dispatch<
    React.SetStateAction<
      [number, number][]
    >
  >;

  setRouteDistance: React.Dispatch<
    React.SetStateAction<number>
  >;

  setRouteDuration: React.Dispatch<
    React.SetStateAction<number>
  >;

  setRouteGenerated: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export default function useRoutePersistence({
  stops,
  routePoints,
  routeDistance,
  routeDuration,
  routeGenerated,
  setStops,
  setRoutePoints,
  setRouteDistance,
  setRouteDuration,
  setRouteGenerated,
}: UseRoutePersistenceProps) {

  const hasLoaded = useRef(false);
  const isFirstSave = useRef(true);

  useEffect(() => {
    console.log("LOADING ROUTE");

    const savedRoute =
      localStorage.getItem("convoy-route");

    console.log(
      "LOCAL STORAGE VALUE:",
      savedRoute
    );

    if (!savedRoute) return;

    const routeData =
      JSON.parse(savedRoute);

    console.log(
      "PARSED ROUTE:",
      routeData
    );

    setStops(routeData.stops || []);

    setRoutePoints(
      routeData.routePoints || []
    );

    setRouteDistance(
      routeData.routeDistance || 0
    );

    setRouteDuration(
      routeData.routeDuration || 0
    );

    setRouteGenerated(
      routeData.routeGenerated || false
    );
    hasLoaded.current = true;
  }, []);

  useEffect(() => {
    if (!hasLoaded.current) return;

    if (isFirstSave.current) {
      isFirstSave.current = false;
      return;
    }

    console.log("SAVING ROUTE", {
      stops: stops.length,
      routePoints: routePoints.length,
      routeDistance,
      routeDuration,
      routeGenerated,
    });

    const routeData = {
      stops,
      routePoints,
      routeDistance,
      routeDuration,
      routeGenerated,
    };

    localStorage.setItem(
      "convoy-route",
      JSON.stringify(routeData)
    );
  }, [
    stops,
    routePoints,
    routeDistance,
    routeDuration,
    routeGenerated,
  ]);
}