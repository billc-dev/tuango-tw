import type { NextPage } from "next";
import Head from "next/head";

import Stats from "domain/Stats";

const StatsPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>營收 - 開心團購後台</title>
      </Head>
      <Stats />
    </div>
  );
};

export default StatsPage;
