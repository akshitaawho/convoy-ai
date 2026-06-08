import { Stop } from "../types";

type RouteInfoProps = {
  startStop?: Stop;
  endStop?: Stop;
  stops: Stop[];
  routeDistance: number;
  routeDuration: number;
  routeGenerated: boolean;
  clearRoute: () => void;
  undoLastStop: () => void;
  generateRoute: () => void;
};

export default function RouteInfo({
  startStop,
  endStop,
  stops,
  routeDistance,
  routeDuration,
  routeGenerated,
  clearRoute,
  undoLastStop,
  generateRoute,
}: RouteInfoProps) {
  return (
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
            {index + 1}. {stop.name}
        </p>
        ))}

      <p>
        Route Length: {(routeDistance / 1000).toFixed(2)} km
      </p>

      <p>
        Estimated Time: {(routeDuration / 60).toFixed(0)} min
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
  );
}