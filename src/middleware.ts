export { auth as middleware } from '@/lib/nextauth/auth'

export const config = {
  matcher: ['/dashboard/:path*', '/account/:path*'],
}
