import type { NextPage } from "next";
import Head from "next/head";

import User from "domain/User";

const UsersPage: NextPage = () => {
  return (
    <div className="mx-3">
      <Head>
        <title>用戶 - 開心團購後台</title>
      </Head>
      <User />
    </div>
  );
};

export default UsersPage;
