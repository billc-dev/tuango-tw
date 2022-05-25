import type { NextPage } from "next";
import Head from "next/head";

import Message from "domain/Message";

const MessagePage: NextPage = () => {
  return (
    <div className="mx-3">
      <Head>
        <title>訊息 - 開心團購後台</title>
      </Head>
      <Message />
    </div>
  );
};

export default MessagePage;
