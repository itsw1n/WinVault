import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith("/dashboard")) {
    const url = new URL("/sign-in", req.url)
    url.searchParams.set("callbackUrl", req.nextUrl.pathname)
    return NextResponse.redirect(url)
  }
})

export const config = {
  matcher: ["/dashboard/:path*"],
}
