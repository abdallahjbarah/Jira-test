export const reactQueryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // gcTime: ONE_MINUTE_IN_MILLI * 30,
      gcTime: Infinity,
      retry: 0,
    },
  },
};
