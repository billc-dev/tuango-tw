import type { NextPage } from "next";

import Order from "domain/Order";

const Orders: NextPage = () => {
  return (
    <div className="mx-3">
      <Order />
    </div>
  );
};

export default Orders;
