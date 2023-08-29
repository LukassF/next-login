import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getDataFromToken } from "./utils/getDataFromToken";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/signup";

  const token = req.cookies.get("token")?.value || "";
  const currentId = req.cookies.get("currentId")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(
      new URL(`${currentId ? "/profile/" + currentId : "/"}`, req.nextUrl)
    );
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/login", "/signup", "/profile/:id*"],
};
