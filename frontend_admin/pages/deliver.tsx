import type { NextPage } from "next";
import Head from "next/head";

import Deliver from "domain/Deliver";

const DeliverPage: NextPage = () => {
  return (
    <div className="mx-3">
      <Head>
        <title>進貨 - 開心團購後台</title>
      </Head>
      <Deliver />
    </div>
  );
};

export default DeliverPage;
