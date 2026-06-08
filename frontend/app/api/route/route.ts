import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  console.log("Received stops:");
  console.log(body);

  return NextResponse.json({
    message: "Route API working",
  });
}