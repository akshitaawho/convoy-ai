import { useEffect } from "react";
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
  useEffect(() => {
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

  useEffect(() => {
    const savedRoute =
      localStorage.getItem("convoy-route");

    if (!savedRoute) return;

    const routeData =
      JSON.parse(savedRoute);

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
  }, []);
}