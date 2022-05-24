import type { NextPage } from "next";
import Head from "next/head";

import Order from "domain/Order";

const Orders: NextPage = () => {
  return (
    <div className="mx-3">
      <Head>
        <title>訂單 - 開心團購後台</title>
      </Head>
      <Order />
    </div>
  );
};

export default Orders;
