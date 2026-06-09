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
    <div className="mt-4 bg-white border border-gray-200 rounded-2xl p-5">
      <h2 className="text-xl font-semibold mb-4">
        Route Summary
      </h2>

      <div className="space-y-2 mb-4">
        {startStop && (
          <p>
            <span className="font-medium">Start:</span>{" "}
            {startStop.name}
          </p>
        )}

        {endStop && (
          <p>
            <span className="font-medium">End:</span>{" "}
            {endStop.name}
          </p>
        )}

        <p>
          <span className="font-medium">Stops:</span>{" "}
          {stops.length}
        </p>

        <p>
          <span className="font-medium">Distance:</span>{" "}
          {(routeDistance / 1000).toFixed(2)} km
        </p>

        <p>
          <span className="font-medium">Time:</span>{" "}
          {(routeDuration / 60).toFixed(0)} min
        </p>

        <p>
          <span className="font-medium">Status:</span>{" "}
          {routeGenerated ? "Ready" : "Not Generated"}
        </p>
      </div>

      {stops.length > 0 && (
        <>
          <h3 className="font-medium mb-2">
            Stops
          </h3>

          <div className="space-y-1 mb-4">
            {stops.map((stop, index) => (
              <p key={index}>
                {index + 1}. {stop.name}
              </p>
            ))}
          </div>
        </>
      )}

      <ControlButtons
        clearRoute={clearRoute}
        undoLastStop={undoLastStop}
        generateRoute={generateRoute}
      />
    </div>
  );
}