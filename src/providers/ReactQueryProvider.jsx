import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { reactQueryClientOptions } from "@configs/reactQueryClientOptions";

function ReactQueryProvider({ children, appProps }) {
  const [queryClient] = useState(
    () => new QueryClient(reactQueryClientOptions),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={appProps.dehydratedState}>{children}</Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
