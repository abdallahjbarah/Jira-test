import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { TOKEN_NAME } from './utils';
import { ApprovalStatus } from './lib/enums';
export const locales = ['en', 'ar'];
export const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // If the pathname is for static assets or API routes, we don't need to redirect
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/SVGs')
  ) {
    return NextResponse.next();
  }

  // Get the current locale
  const locale = getLocale(request);

  // Check for user status in cookies and redirect if needed
  const userStatus = request.cookies.get('userStatus')?.value;

  const isLoggedIn = request.cookies.get(TOKEN_NAME)?.value;

  // Check for each locale if the path starts with /profile
  const isProfilePath = locales.some((loc) =>
    pathname.startsWith(`/${loc}/profile`),
  );

  const isMyBookingsPath = locales.some((loc) =>
    pathname.startsWith(`/${loc}/my-bookings`),
  );

  const isWishlistPath = locales.some((loc) =>
    pathname.startsWith(`/${loc}/wishlist`),
  );

  // Check if the path is for login or signup
  const isAuthPath = locales.some(
    (loc) =>
      pathname.startsWith(`/${loc}/auth/login`) ||
      pathname.startsWith(`/${loc}/auth/signup`),
  );

  // If the user has status 3 and is trying to access profile, redirect to verify page
  if (
    userStatus === ApprovalStatus.PENDING.toString() &&
    (isProfilePath || isMyBookingsPath || isWishlistPath)
  ) {
    console.log('redirecting to verify page');
    return NextResponse.redirect(
      new URL(`/${locale}/auth/verify${request.nextUrl.search}`, request.url),
    );
  }

  // If the user is logged in and trying to access login/signup, redirect to main page
  if (isLoggedIn && isAuthPath) {
    return NextResponse.redirect(
      new URL(`/${locale}${request.nextUrl.search}`, request.url),
    );
  }

  // Redirect if the pathname is missing a locale
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname === '/' ? '' : pathname}${request.nextUrl.search}`,
        request.url,
      ),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - API routes, static files, etc
    // - locale pathnames
    '/((?!api|_next|favicon\\.ico|images|fonts|SVGs).*)',
  ],
};
