"use client";

import { useEffect, useState } from "react";

export default function SavedRoutesPage() {
  const [routes, setRoutes] = useState<any[]>([]);

  function loadRoute(route: any) {
    console.log("=================================");
    console.log("ROUTE CLICKED");
    console.log(route);

    const routeData = {
        stops: route.stops,
        routePoints: route.routePoints || [],
        routeDistance: route.distance,
        routeDuration: route.duration,
        routeGenerated: true,
        routeTitle: route.title,
    };

    console.log("WRITING TO convoy-route:");
    console.log(routeData);

    localStorage.setItem(
      "convoy-route",
      JSON.stringify(routeData)
    );

    console.log(
      "AFTER WRITE:",
      JSON.parse(
        localStorage.getItem("convoy-route") || "{}"
      )
    );

    alert("Route loaded into localStorage");

    // NOW navigate
    window.location.href = "/";
  }

  useEffect(() => {
    const savedRoutes = JSON.parse(
      localStorage.getItem("saved-routes") || "[]"
    );

    console.log("SAVED ROUTES:");
    console.log(savedRoutes);

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
            onClick={() => loadRoute(route)}
            className="bg-white border border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-[#FF856D] transition"
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