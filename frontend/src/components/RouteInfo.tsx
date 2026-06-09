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

      <div className="space-y-3 mb-5 text-sm md:text-base">
        <div className="flex justify-between">
          <span>Stops</span>
          <span className="font-medium">
            {stops.length}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Distance</span>
          <span className="font-medium">
            {(routeDistance / 1000).toFixed(2)} km
          </span>
        </div>

        <div className="flex justify-between">
          <span>Duration</span>
          <span className="font-medium">
            {(routeDuration / 60).toFixed(0)} min
          </span>
        </div>

        <div className="flex justify-between">
          <span>Status</span>
          <span className="font-medium">
            {routeGenerated ? "Ready" : "Not Generated"}
          </span>
        </div>
      </div>

      {stops.length > 0 && (
        <>
          <h3 className="font-medium text-gray-700 mb-3">
            Route Stops
          </h3>

          <div className="space-y-2 mb-5">
            {stops.map((stop, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
              >
                <span className="font-medium">
                  {index + 1}.
                </span>{" "}
                {stop.name}
              </div>
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