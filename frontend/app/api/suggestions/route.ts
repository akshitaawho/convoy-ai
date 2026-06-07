import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json([]);
  }

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${query}`,
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

  console.log("NOMINATIM RESPONSE:");
  console.log(data);

  return NextResponse.json(data);
}