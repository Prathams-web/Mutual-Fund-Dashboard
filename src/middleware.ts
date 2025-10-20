import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  //   console.log({ myReq: req });
  const pathname = req.nextUrl.pathname;
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }
  if (pathname != "/dashboard") {
    console.log("redirected");
    return NextResponse.redirect(new URL("/dashboard", req.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/",
    "/:path",
    "/:path/:path",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
