import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const stops = body.stops;

  if (!stops || stops.length < 2) {
    return NextResponse.json(
      { error: "Need at least 2 stops" },
      { status: 400 }
    );
  }

  const coordinates = stops
    .map((stop: any) => `${stop.lng},${stop.lat}`)
    .join(";");

  const response = await fetch(
    `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`
  );

  const data = await response.json();

  return NextResponse.json(data);
}
