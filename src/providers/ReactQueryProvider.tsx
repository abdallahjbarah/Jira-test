'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { reactQueryClientOptions } from '@configs/reactQueryClientOptions';

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient(reactQueryClientOptions);

function ReactQueryProvider({
  children,
}: ReactQueryProviderProps): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
