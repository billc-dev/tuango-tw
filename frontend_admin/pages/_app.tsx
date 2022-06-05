import type { AppProps } from "next/app";
import { useState } from "react";

import axios from "axios";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { API_URL, WINDOW_URL } from "utils";
import { ReactQueryDevtools } from "react-query/devtools";

import TopNavbar from "components/Navigation/TopNavbar";

import "../styles/globals.css";
import { isAuthenticated } from "domain/User/api";
import { setAccessToken } from "domain/User/services/accessToken";
import AuthRouter from "components/Navigation/AuthRouter";

axios.defaults.baseURL = API_URL;
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

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60,
            refetchOnMount: "always",
            retry: 1,
          },
        },
      })
  );
  
  return (
    <QueryClientProvider client={queryClient}>
      <TopNavbar />
      <AuthRouter>
        <Component {...pageProps} />
      </AuthRouter>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} position="top-right" />
    </QueryClientProvider>
  );
}

export default MyApp;
