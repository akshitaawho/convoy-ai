import { NextRequest, NextResponse } from "next/server";

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  console.log("USER LOCATION:", lat, lon);

  if (!query) {
    return NextResponse.json([]);
  }

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=in&addressdetails=1&limit=20`,
    {
      headers: {
        "User-Agent": "ConvoyAI/1.0",
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    console.log("Nominatim error:", response.status);
    return NextResponse.json([]);
  }

  const data = await response.json();

  if (lat && lon) {
    const userLat = parseFloat(lat);
    const userLon = parseFloat(lon);

    const sortedResults = data
      .map((place: any) => ({
        ...place,
        distance: calculateDistance(
          userLat,
          userLon,
          parseFloat(place.lat),
          parseFloat(place.lon)
        ),
      }))
      .sort((a: any, b: any) => a.distance - b.distance);

    return NextResponse.json(sortedResults);
  }

  return NextResponse.json(data);
}