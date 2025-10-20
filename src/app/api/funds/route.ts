// /app/api/funds/route.ts
import { NextResponse } from "next/server";
import { funds } from "./fundsData"; // import your data

export async function GET() {
  // You can optionally implement query params for filtering later
  const response = {
    responseCode: 200,
    responseMessage: "Data Fetch Success",
    responseData: null,
    data: funds,
  };
  return NextResponse.json(response, { status: 200 });
}
