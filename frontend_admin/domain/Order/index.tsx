import { useRouter } from "next/router";
import React from "react";

import EditOrder from "./EditOrder";
import OrderTable from "./OrderTable";

const Order = () => {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-7xl">
      <OrderTable />
      {typeof router.query.edit_order_id === "string" && (
        <EditOrder orderId={router.query.edit_order_id} />
      )}
    </div>
  );
};

export default Order;
