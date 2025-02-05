import { NextRequest, NextResponse } from "next/server";
import { deleteSession, getSession } from "@/features/auth/lib/auth/session";

const protectedRoutes = ["/"];
const publicRoutes = ["sign-in", "sign-up"];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const session = await getSession();

  const sessionExpired =
    session?.expiresAt &&
    new Date(session.expiresAt.toString()).getTime() < Date.now();

  if (sessionExpired) {
    await deleteSession();
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  }

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
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
