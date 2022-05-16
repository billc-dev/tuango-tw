import type { NextPage } from "next";

import User from "domain/User";

const Deliver: NextPage = () => {
  return (
    <div className="mx-3">
      <User />
    </div>
  );
};

export default Deliver;
