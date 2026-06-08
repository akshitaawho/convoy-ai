import { Stop } from "../types";
import ControlButtons from "./ControlButtons";

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

      <ControlButtons
        clearRoute={clearRoute}
        undoLastStop={undoLastStop}
        generateRoute={generateRoute}
        />

    </div>
  );
}