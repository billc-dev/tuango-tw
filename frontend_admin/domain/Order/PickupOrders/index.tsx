import React, { FC } from "react";

import OrderCard from "domain/Order/PickupOrders/OrderCard";

import { usePickupOrders } from "../hooks";
import CreateOrder from "./CreateOrder";
import Payment from "./Payment";
import UserComment from "./UserComment";

interface Props {
  username: string;
}

const PickupOrders: FC<Props> = ({ username }) => {
  const ordersQuery = usePickupOrders(username);
  return (
    <div>
      {ordersQuery.data && (
        <>
          <Payment orders={ordersQuery.data} />
          <UserComment {...{ username }} />
          <CreateOrder {...{ username }} />
          {ordersQuery.data.map((order) => (
            <OrderCard key={order._id} {...{ order, username }} />
          ))}
        </>
      )}
    </div>
  );
};

export default PickupOrders;
