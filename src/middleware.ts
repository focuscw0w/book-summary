import { NextRequest, NextResponse } from "next/server";
import { deleteSession, getSession } from "@/features/auth/lib/auth/session";

const protectedRoutes = ["/", "/my-books"];
const publicRoutes = ["/sign-in", "/sign-up"];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith("/api")) {
    return NextResponse.next();
  }

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

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

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}
