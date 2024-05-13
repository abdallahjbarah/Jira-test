import { ONE_MINUTE_IN_MILLI } from "@utils/constants";

export const reactQueryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: ONE_MINUTE_IN_MILLI,
      retry: 0,
    },
  },
};
