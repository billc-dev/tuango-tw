import type { AppProps } from "next/app";
import { useState } from "react";

import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnMount: "always",
            retry: 1,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <Toaster toastOptions={{ duration: 5000 }} />
    </QueryClientProvider>
  );
}

export default MyApp;
