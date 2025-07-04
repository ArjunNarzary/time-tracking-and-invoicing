import { NextRequest, NextResponse } from "next/server"
import { authConfig } from "@/lib/auth/auth.config"
import NextAuth from "next-auth"
import { ROUTES, PUBLIC_ROUTES } from "./routes"

const { auth } = NextAuth(authConfig)

export async function middleware(request: NextRequest) {
  const { nextUrl } = request
  const session = await auth()

  const isAuthenticated = !!session?.user

  const isPublicRoute =
    PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) ||
    nextUrl.pathname === ROUTES.home

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(ROUTES.login, nextUrl))
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
