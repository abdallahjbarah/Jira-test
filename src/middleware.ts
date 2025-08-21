import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ApprovalStatus } from './lib/enums';
import { TOKEN_NAME } from './utils';
export const locales = ['en', 'ar'];
export const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

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

  const locale = getLocale(request);

  const userStatus = request.cookies.get('userStatus')?.value;

  const isLoggedIn = request.cookies.get(TOKEN_NAME)?.value;

  const isProfilePath = locales.some(loc =>
    pathname.startsWith(`/${loc}/profile`)
  );

  const isMyBookingsPath = locales.some(loc =>
    pathname.startsWith(`/${loc}/my-bookings`)
  );

  const isWishlistPath = locales.some(loc =>
    pathname.startsWith(`/${loc}/wishlist`)
  );

  const isAuthPath = locales.some(
    loc =>
      pathname.startsWith(`/${loc}/auth/login`) ||
      pathname.startsWith(`/${loc}/auth/signup`)
  );

  const isVerifyPath = locales.some(loc =>
    pathname.startsWith(`/${loc}/auth/verify`)
  );

  if (isVerifyPath) {
    const email = request.nextUrl.searchParams.get('email');
    const type = request.nextUrl.searchParams.get('type');

    if (!email && type !== 'forgot-password') {
      return NextResponse.redirect(
        new URL(`/${locale}/auth/login`, request.url)
      );
    }
  }

  if (
    userStatus === ApprovalStatus.PENDING.toString() &&
    (isProfilePath || isMyBookingsPath || isWishlistPath)
  ) {
    return NextResponse.redirect(
      new URL(`/${locale}/auth/verify${request.nextUrl.search}`, request.url)
    );
  }

  if (isLoggedIn && isAuthPath) {
    return NextResponse.redirect(
      new URL(`/${locale}${request.nextUrl.search}`, request.url)
    );
  }

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname === '/' ? '' : pathname}${request.nextUrl.search}`,
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|favicon\\.ico|images|fonts|SVGs).*)'],
};
