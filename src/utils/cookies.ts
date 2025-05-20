import Cookies from 'js-cookie';

interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * Sets a cookie with the given name and value
 * @param name The name of the cookie
 * @param value The value to store in the cookie
 * @param options Additional cookie options
 */
export const setCookie = (
  name: string,
  value: string | object,
  options?: CookieOptions,
): void => {
  const stringValue = typeof value === 'object' ? JSON.stringify(value) : value;
  Cookies.set(name, stringValue, options);
};

/**
 * Gets a cookie value by name
 * @param name The name of the cookie
 * @param parseJSON Whether to parse the cookie value as JSON
 * @returns The cookie value or undefined if not found
 */
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
      console.error(`Error parsing cookie ${name}:`, error);
      return value;
    }
  }

  return value;
};

/**
 * Removes a cookie
 * @param name The name of the cookie to remove
 * @param options Additional cookie options
 */
export const removeCookie = (
  name: string,
  options?: Pick<CookieOptions, 'path' | 'domain'>,
): void => {
  Cookies.remove(name, options);
};

/**
 * Checks if a cookie exists
 * @param name The name of the cookie
 * @returns True if the cookie exists, false otherwise
 */
export const hasCookie = (name: string): boolean => {
  return !!Cookies.get(name);
};

/**
 * Sets a cookie with JSON value
 * @param name The name of the cookie
 * @param value The object to store in the cookie
 * @param options Additional cookie options
 */
export const setJSONCookie = <T>(
  name: string,
  value: T,
  options?: CookieOptions,
): void => {
  setCookie(name, JSON.stringify(value), options);
};

/**
 * Gets a JSON cookie value by name
 * @param name The name of the cookie
 * @returns The parsed JSON value or undefined if not found
 */
export const getJSONCookie = <T>(name: string): T | undefined => {
  return getCookie<T>(name, true) as T | undefined;
};

/**
 * Get all cookies as an object
 * @returns An object with all cookies
 */
export const getAllCookies = (): Record<string, string> => {
  return Cookies.get();
};

/**
 * Clear all cookies
 * @param options Additional cookie options
 */
export const clearAllCookies = (
  options?: Pick<CookieOptions, 'path' | 'domain'>,
): void => {
  const cookies = getAllCookies();
  Object.keys(cookies).forEach((cookieName) => {
    removeCookie(cookieName, options);
  });
};
