'use client';

import { reactQueryClientOptions } from '@configs/reactQueryClientOptions';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import React from 'react';

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient(reactQueryClientOptions);

function ReactQueryProvider({
  children,
}: ReactQueryProviderProps): React.ReactElement {
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const localStoragePersister = createSyncStoragePersister({
        storage: window.localStorage,
      });

      persistQueryClient({
        queryClient,
        persister: localStoragePersister,
        dehydrateOptions: {
          shouldDehydrateQuery: query => {
            const queryKey = query.queryKey[0] as string;
            return queryKey === 'user' || queryKey === 'bookingData';
          },
        },
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
