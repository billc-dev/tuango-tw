import React, { FC, useEffect } from "react";

import LoadingIndicator from "components/Indicator/LoadingIndicator";
import OrderCard from "domain/Order/PickupOrders/OrderCard";
import { User } from "domain/User/types";

import { usePickupOrders } from "../hooks";
import BatchChangeOrderStatus from "./BatchChangeOrderStatus";
import CreateOrder from "./CreateOrder";
import Payment from "./Payment";
import UserComment from "./UserComment";

interface Props {
  username: string;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const PickupOrders: FC<Props> = ({ username, setUser }) => {
  const ordersQuery = usePickupOrders(username);
  useEffect(() => {
    return () => {
      ordersQuery.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {ordersQuery.data && (
        <>
          <Payment orders={ordersQuery.data} {...{ setUser }} />
          <UserComment {...{ username }} />
          <CreateOrder {...{ username }} />
          <BatchChangeOrderStatus {...{ username }} />
          {ordersQuery.data.map((order) => (
            <OrderCard key={order._id} {...{ order, username }} />
          ))}
        </>
      )}
      <LoadingIndicator loading={ordersQuery.isLoading} />
    </div>
  );
};

export default PickupOrders;
