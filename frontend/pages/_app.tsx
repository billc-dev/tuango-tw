import axios from "axios";
import BottomNavbar from "components/BottomNavbar";
import ThemeToggle from "components/ThemeToggle";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
// import NextNprogress from "nextjs-progressbar";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "../styles/globals.css";
// ANALYZE=true yarn build

axios.defaults.baseURL =
  "http://localhost:5000/tuango-tw-firebase/asia-east1/api_tw_firebase";
// axios.defaults.baseURL =
//   "https://lhlnrflto9.execute-api.ap-east-1.amazonaws.com";
axios.defaults.withCredentials = true;

export function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider attribute="class">
          {/* <NextNprogress color="#22c55e" /> */}
          <div className="sticky top-0 flex h-14 items-center bg-white p-3 shadow-md dark:bg-zinc-800">
            top navbar
            <ThemeToggle />
          </div>
          <div className="transition-shadow">
            <Component {...pageProps} />
          </div>
          <BottomNavbar />
        </ThemeProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
