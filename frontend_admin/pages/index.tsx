import type { NextPage } from "next";
import Head from "next/head";

import Pickup from "domain/Pickup";

const Home: NextPage = () => {
  return (
    <div className="mx-3">
      <Head>
        <title>取貨 - 開心團購後台</title>
      </Head>
      <Pickup />
    </div>
  );
};

export default Home;
