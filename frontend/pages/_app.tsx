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
import { isAuthenticated } from "domain/User/api";
import { setAccessToken } from "domain/User/services/accessToken";
import { API_URL, WINDOW_URL } from "utils/constants";

import "../styles/globals.css";
import GoogleAnalytics from "domain/GoogleAnalytics";

// ANALYZE=true yarn build

axios.defaults.baseURL = API_URL
axios.defaults.withCredentials = true;

const instance = axios.create();

function refreshToken() {
  return instance.post(`${WINDOW_URL}/api/auth/refresh`).then((res) => {
    setAccessToken(res.data.accessToken);
    return res.data.accessToken;
  });
}
axios.interceptors.request.use(
  async (config) => {
    // @ts-ignore axios incomplete typings for AxiosRequestHeaders
    const token = config.headers?.common.Authorization;
    if (token) {
      if (!isAuthenticated()) {
        const newToken = await refreshToken()
        // @ts-ignore axios incomplete typings for AxiosRequestHeaders
        config.headers?.common.Authorization = newToken;
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 1000 * 60 * 5, refetchOnMount: "always", retry: 1},
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
            <link rel="manifest" href="/manifest.json" />
          </Head>
          <GoogleAnalytics />
          <TopNavbar />
          {/* @ts-ignore */}
          <Component {...pageProps} />
          <BottomNavbar />
          <Toaster toastOptions={{ duration: 5000 }} />
        </ThemeProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
