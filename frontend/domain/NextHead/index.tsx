import Head from "next/head";
import React from "react";

const NextHead = () => {
  return (
    <Head>
      <title>開心團購</title>
      <meta
        name="description"
        content="開心鮮拼鮮難瘦團，就是買買買，不買難受，買了難瘦，歡迎加入買買買。"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png?v=1"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png?v=1"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png?v=1"
      />
      <link rel="manifest" href="/site.webmanifest?v=1" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg?v=1" color="#5bbad5" />
      <link rel="shortcut icon" href="/favicon.ico?v=1" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
};

export default NextHead;
