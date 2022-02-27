import React, { FC } from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import { useNormalUserOrders } from "../hooks";
import NormalOrderCard from "./NormalOrderCard";

interface Props {
  status: "ordered" | "delivered" | "missing" | "canceled";
}

const NormalOrders: FC<Props> = ({ status }) => {
  const limit = 16;
  const ordersQuery = useNormalUserOrders(limit, status);
  const ordersLength = ordersQuery.data?.pages.reduce(
    (sum, page) => page.data.orders.length + sum,
    0
  );
  return (
    <div className="max-w-md mx-auto">
      <InfiniteScroll
        dataLength={ordersLength || 0}
        next={ordersQuery.fetchNextPage}
        hasMore={!!ordersQuery.hasNextPage}
        loader={<></>}
      >
        {ordersQuery.data?.pages.map((page) =>
          page.data.orders.map((order) => (
            <NormalOrderCard key={order._id} order={order} />
          ))
        )}
      </InfiniteScroll>
      {!ordersQuery.isLoading &&
        ordersQuery.data?.pages[0].data.orders.length === 0 && (
          <p className="text-center pt-2">
            您目前沒有
            {status === "ordered" && "已下訂"}
            {status === "delivered" && "已到貨"}
            {status === "missing" && "尋貨中"}
            {status === "canceled" && "已取消"}
            的訂單
          </p>
        )}
    </div>
  );
};

export default NormalOrders;
