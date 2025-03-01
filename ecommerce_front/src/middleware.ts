import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const userSessionCookie = request.cookies.get("userSession")?.value;
  const { pathname } = request.nextUrl;

  const protectedPaths = "/(admin)";

  if (!userSessionCookie) {
    console.log("No user session found. Creating a new default session.");

    const newUserSession = JSON.stringify({
      state: { user: null, token: null },
    });

    const res = NextResponse.redirect(new URL("/", request.url));
    res.cookies.set("userSession", newUserSession, { path: "/" });

    if (pathname !== "/") {
      return res;
    }

    return NextResponse.next();
  }
  const userSession = JSON.parse(userSessionCookie);

  if (
    pathname.match(protectedPaths) &&
    (!userSession?.state?.user || userSession?.state?.user?.role !== "admin")
  ) {
    console.log("Unauthorized access attempt to admin route.");

    const newUserSession = JSON.stringify({
      state: { user: null, token: null },
    });

    const res = NextResponse.redirect(new URL("/", request.url));
    res.cookies.set("userSession", newUserSession, { path: "/" });

    if (pathname !== "/") {
      return res;
    }

    return NextResponse.next();
  }

  return NextResponse.next();
};
