import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect } from "react";

import { getLocalStorageUser } from "domain/User/services";

import { GA_TRACKING_ID, pageview } from "./gtag";

const GoogleAnalytics = () => {
  const router = useRouter();
  const user = getLocalStorageUser();
  const userId = user ? `user_id: '${user.data.user.username}'` : "";

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Script
        id="gtag-script"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              ${userId}
            });
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
