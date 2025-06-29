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
      const response = await next(url, opts);
      return response;
    } catch (error: unknown) {
      if (
        error &&
        typeof error === 'object' &&
        'status' in error &&
        error.status === 401
      ) {
        jsCookie.remove(TOKEN_NAME);

        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
      }

      throw error;
    }
  };

export default authMiddleware;
