"use client";

import { useEffect, useState } from "react";
import Navbar from "../../src/components/Navbar";

export default function SavedRoutesPage() {
  const [routes, setRoutes] = useState<any[]>([]);

  function loadRoute(route: any) {
    const routeData = {
      stops: route.stops,
      routePoints: route.routePoints || [],
      routeDistance: route.distance,
      routeDuration: route.duration,
      routeGenerated: true,
      routeTitle: route.title,
    };

    localStorage.setItem(
      "convoy-route",
      JSON.stringify(routeData)
    );

    window.location.href = "/";
  }

  useEffect(() => {
    const savedRoutes = JSON.parse(
      localStorage.getItem("saved-routes") || "[]"
    );

    setRoutes(savedRoutes);
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f5f5] p-4 md:p-8">
      <Navbar />

      <h1 className="text-4xl font-bold mb-2">
        Saved Routes
      </h1>

      <p className="text-gray-500 mb-6">
        Your saved Convoy routes.
      </p>

      {routes.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">
            No saved routes yet
          </h2>

          <p className="text-gray-500">
            Create and save a route to see it here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {routes.map((route) => (
            <div
              key={route.id}
              className="bg-white border border-gray-200 rounded-2xl p-4"
            >
              <h2 className="font-semibold text-lg">
                {route.title}
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                {route.stops.length} stops •{" "}
                {(route.distance / 1000).toFixed(2)} km •{" "}
                {Math.floor(route.duration / 3600)}h{" "}
                {Math.floor(
                    (route.duration % 3600) / 60
                )}m
              </p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => loadRoute(route)}
                  className="px-4 py-2 rounded-lg bg-[#FF856D] text-white hover:opacity-90"
                >
                  Load Route
                </button>

                <button
                  onClick={() => {
                    const confirmed = confirm(
                      `Delete "${route.title}"?`
                    );

                    if (!confirmed) return;

                    const updatedRoutes = routes.filter(
                      (r) => r.id !== route.id
                    );

                    localStorage.setItem(
                      "saved-routes",
                      JSON.stringify(updatedRoutes)
                    );

                    setRoutes(updatedRoutes);
                  }}
                  className="px-4 py-2 rounded-lg border border-red-300 text-red-500 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}