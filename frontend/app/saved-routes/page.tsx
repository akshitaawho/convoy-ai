"use client";

import { useEffect, useState } from "react";

export default function SavedRoutesPage() {
  const [routes, setRoutes] = useState<any[]>([]);

  useEffect(() => {
    const savedRoutes = JSON.parse(
      localStorage.getItem("saved-routes") || "[]"
    );

    setRoutes(savedRoutes);
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f5f5] p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-2">
        Saved Routes
      </h1>

      <p className="text-gray-500 mb-6">
        Your saved Convoy routes.
      </p>

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
              Stops: {route.stops.length}
            </p>

            <p className="text-gray-500 text-sm">
              Distance: {(route.distance / 1000).toFixed(2)} km
            </p>

            <p className="text-gray-500 text-sm">
              Duration: {(route.duration / 60).toFixed(0)} min
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}