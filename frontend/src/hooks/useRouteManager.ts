import { Stop } from "../types";

type UseRouteManagerProps = {
  stops: Stop[];
  setStops: React.Dispatch<
    React.SetStateAction<Stop[]>
  >;

  routePoints: [number, number][];
  setRoutePoints: React.Dispatch<
    React.SetStateAction<
      [number, number][]
    >
  >;

  routeDistance: number;
  setRouteDistance: React.Dispatch<
    React.SetStateAction<number>
  >;

  routeDuration: number;
  setRouteDuration: React.Dispatch<
    React.SetStateAction<number>
  >;

  routeGenerated: boolean;
  setRouteGenerated: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  routeTitle: string;
};

export default function useRouteManager({
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
}: UseRouteManagerProps) {

  function clearRoute() {
    setStops([]);
    setRoutePoints([]);
    setRouteDistance(0);
    setRouteDuration(0);
    setRouteGenerated(false);

    localStorage.removeItem(
      "convoy-route"
    );
  }

  async function generateRoute() {
    if (stops.length < 2) {
      alert("Select at least 2 stops");
      return;
    }

    const response = await fetch(
      "/api/route",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          stops,
        }),
      }
    );

    const data =
      await response.json();

    setRouteDistance(
      data.routes[0].distance
    );

    setRouteDuration(
      data.routes[0].duration
    );

    const coordinates =
      data.routes[0].geometry
        .coordinates;

    const route =
      coordinates.map(
        ([lng, lat]: [
          number,
          number
        ]) =>
          [
            lat,
            lng,
          ] as [
            number,
            number
          ]
      );

    setRoutePoints(route);

    setRouteGenerated(true);
  }

  async function undoLastStop() {
    const updatedStops =
      stops.slice(0, -1);

    setStops(updatedStops);

    if (updatedStops.length < 2) {
      setRoutePoints([]);
      setRouteDistance(0);
      setRouteDuration(0);
      setRouteGenerated(false);
      return;
    }

    const response = await fetch(
      "/api/route",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          stops: updatedStops,
        }),
      }
    );

    const data =
      await response.json();

    const coordinates =
      data.routes[0].geometry
        .coordinates;

    const route =
      coordinates.map(
        ([lng, lat]: [
          number,
          number
        ]) =>
          [
            lat,
            lng,
          ] as [
            number,
            number
          ]
      );

    setRoutePoints(route);

    setRouteDistance(
      data.routes[0].distance
    );

    setRouteDuration(
      data.routes[0].duration
    );

    setRouteGenerated(true);
  }

  function saveRoute() {
    if (!routeGenerated) {
      alert(
        "Generate a route first"
      );
      return;
    }

    const savedRoutes =
      JSON.parse(
        localStorage.getItem(
          "saved-routes"
        ) || "[]"
      );

    const newRoute = {
      id: Date.now(),
      title:
        routeTitle ||
        `Route ${
          savedRoutes.length + 1
        }`,
      stops,
      routePoints,
      distance: routeDistance,
      duration: routeDuration,
    };

    savedRoutes.push(newRoute);

    localStorage.setItem(
      "saved-routes",
      JSON.stringify(
        savedRoutes
      )
    );

    alert("Route saved!");
  }

  return {
    clearRoute,
    generateRoute,
    undoLastStop,
    saveRoute,
  };
}