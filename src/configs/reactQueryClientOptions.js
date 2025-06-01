import { ONE_MINUTE_IN_MILLI } from '@utils/constants';

export const reactQueryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      gcTime: ONE_MINUTE_IN_MILLI * 30,
      retry: 0,
    },
  },
};
