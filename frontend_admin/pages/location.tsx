import type { NextPage } from "next";
import Head from "next/head";

import Location from "domain/Location";

const LocationPage: NextPage = () => {
  return (
    <div className="mx-2">
      <Head>
        <title>位置 - 開心團購後台</title>
      </Head>
      <Location />
    </div>
  );
};

export default LocationPage;
