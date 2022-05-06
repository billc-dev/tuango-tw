import React, { FC } from "react";

import OrderCard from "domain/Order/PickupOrders/OrderCard";

import { usePickupOrders } from "../hooks";

interface Props {
  username: string;
}

const PickupOrders: FC<Props> = ({ username }) => {
  const ordersQuery = usePickupOrders(username);
  return (
    <div>
      {ordersQuery.data?.map((order) => (
        <OrderCard key={order._id} {...{ order, username }} />
      ))}
    </div>
  );
};

export default PickupOrders;
