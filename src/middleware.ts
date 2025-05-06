import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { LOCALES, DEFAULT_LOCALE } from '@utils/constants';

// Define supported locales
export const locales = LOCALES;
export const defaultLocale = DEFAULT_LOCALE;

// Get preferred locale using the browser's Accept-Language header
function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get the best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return match(languages, locales, defaultLocale);
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     * 5. /fonts directory (for font files)
     * 6. /images directory (for image files)
     * 7. /SVGs directory (for SVG files)
     */
    '/((?!api|_next|_static|_vercel|fonts|images|SVGs|[\\w-]+\\.\\w+).*)',
  ],
};

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  // If the pathname already includes a locale, no need to redirect
  if (pathnameHasLocale) return NextResponse.next();

  // Skip assets, API routes, and other special Next.js routes, skip the public folder
  if (
    [
      '/favicon.ico',
      '/api',
      '/_next',
      '/_static',
      '/fonts',
      '/images',
      '/SVGs',
    ].some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.next();
  }

  // Redirect to the locale-prefixed path
  const locale = getLocale(request);

  // Create a new URL with the locale prefix
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}
