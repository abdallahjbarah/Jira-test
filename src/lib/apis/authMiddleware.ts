import type { FetchLike, WretchOptions, WretchResponse } from 'wretch';

import jsCookie from 'js-cookie';

import { TOKEN_NAME } from '@utils/constants';
const authMiddleware =
  (next: FetchLike) =>
  async (url: string, opts: WretchOptions): Promise<WretchResponse> => {
    const accessToken = jsCookie.get(TOKEN_NAME) || '';

    opts.headers = {
      ...(opts.headers ?? {}),
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    };

    try {
      // Forward the request with the token
      const response = await next(url, opts);
      return response;
    } catch (error: unknown) {
      // Handle 401 Unauthorized errors - token might be expired
      if (
        error &&
        typeof error === 'object' &&
        'status' in error &&
        error.status === 401
      ) {
        // Clear the invalid token
        console.log('Clearing token');
        jsCookie.remove(TOKEN_NAME);

        // Redirect to login page if needed
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
      }

      throw error;
    }
  };

export default authMiddleware;
