import Cookies from 'js-cookie';

interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export const setCookie = (
  name: string,
  value: string | object,
  options?: CookieOptions,
): void => {
  const stringValue = typeof value === 'object' ? JSON.stringify(value) : value;
  Cookies.set(name, stringValue, options);
};

export const getCookie = <T>(
  name: string,
  parseJSON = false,
): T | string | undefined => {
  const value = Cookies.get(name);

  if (!value) return undefined;

  if (parseJSON) {
    try {
      return JSON.parse(value) as T;
    } catch (error) {
      return value;
    }
  }

  return value;
};

export const removeCookie = (
  name: string,
  options?: Pick<CookieOptions, 'path' | 'domain'>,
): void => {
  Cookies.remove(name, options);
};

export const hasCookie = (name: string): boolean => {
  return !!Cookies.get(name);
};

export const setJSONCookie = <T>(
  name: string,
  value: T,
  options?: CookieOptions,
): void => {
  setCookie(name, JSON.stringify(value), options);
};

export const getJSONCookie = <T>(name: string): T | undefined => {
  return getCookie<T>(name, true) as T | undefined;
};

export const getAllCookies = (): Record<string, string> => {
  return Cookies.get();
};

export const clearAllCookies = (
  options?: Pick<CookieOptions, 'path' | 'domain'>,
): void => {
  const cookies = getAllCookies();
  Object.keys(cookies).forEach((cookieName) => {
    removeCookie(cookieName, options);
  });
};
