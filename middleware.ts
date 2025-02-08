import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { STORAGE_KEYS } from "./lib/storage/storage-keys"

export function middleware(request: NextRequest) {
  const token = request.cookies.get(STORAGE_KEYS.AUTH.TOKEN)?.value
  const isAuthRoute = request.nextUrl.pathname.startsWith("/admin")

  if (isAuthRoute && !token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}

