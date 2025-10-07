// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const access = req.cookies.get("access")?.value; // Django se aane wali access cookie

  // ✅ Sirf in routes ko protect karna hai
  const protectedRoutes = ["/profile", "/orders"];
  const isProtected = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // ⚠️ Agar user logged in nahi hai aur protected page pe jaa raha hai
  if (isProtected && !access) {
    const loginUrl = new URL("/auth/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
