import Script from "next/script";
import React, { useEffect } from "react";

const ChatPlugin = () => {
  useEffect(() => {
    const chatbox = document.getElementById("fb-customer-chat");
    chatbox?.setAttribute(
      "page_id",
      process.env.NEXT_PUBLIC_FB_PAGE_ID as string
    );
    chatbox?.setAttribute("attribution", "biz_inbox");
  }, []);
  return (
    <>
      <div id="fb-root" />
      <div id="fb-customer-chat" className="fb-customerchat" />
      <Script
        id="chat-plugin"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.fbAsyncInit = function() {
                FB.init({
                xfbml            : true,
                version          : 'v13.0'
                });
            };

            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = 'https://connect.facebook.net/zh_TW/sdk/xfbml.customerchat.js';
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
          `,
        }}
      />
    </>
  );
};

export default ChatPlugin;
