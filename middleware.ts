import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/features/auth/lib/session";
import { cookies } from "next/headers";

const protectedRoutes = ["/"];
const publicRoutes = ["sign-in", "sign-up"];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/sign-up", request.nextUrl));
  }

  if (
    isPublicRoute &&
    session?.userId &&
    !request.nextUrl.pathname.startsWith("/")
  ) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}
