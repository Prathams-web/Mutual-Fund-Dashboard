// /app/api/funds/route.ts
import { NextResponse } from "next/server";
import { funds } from "./fundsData"; 

export async function GET() {
  const response = {
    responseCode: 200,
    responseMessage: "Data Fetch Success",
    responseData: null,
    data: funds,
  };
  return NextResponse.json(response, { status: 200 });
}
