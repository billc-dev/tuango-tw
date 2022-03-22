import type { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";

import axios from "axios";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import BottomNavbar from "components/Navigation/BottomNavbar";
import TopNavbar from "components/Navigation/TopNavbar";
import { IS_DEV } from "utils/constants";

import "../styles/globals.css";

// ANALYZE=true yarn build

axios.defaults.baseURL = IS_DEV
  ? "http://localhost:5000/tuango-tw-firebase/asia-east1/api_tw_firebase"
  : "https://asia-east1-tuango-tw-firebase.cloudfunctions.net/api_tw_firebase";

axios.defaults.withCredentials = true;

export function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 1000 * 60 * 3, refetchOnMount: "always" },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider attribute="class">
          <Head>
            <title>開心團購</title>
            <meta
              name="description"
              content="開心鮮拼鮮難瘦團，就是買買買，不買難受，買了難瘦，歡迎加入買買買。"
            />
          </Head>
          <TopNavbar />
          <Component {...pageProps} />
          <BottomNavbar />
          <Toaster toastOptions={{ duration: 5000 }} />
        </ThemeProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
