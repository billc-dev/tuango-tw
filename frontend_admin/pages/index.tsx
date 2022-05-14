import type { NextPage } from "next";

import Pickup from "domain/Pickup";

const Home: NextPage = () => {
  return (
    <div className="mx-3">
      <Pickup />
    </div>
  );
};

export default Home;
