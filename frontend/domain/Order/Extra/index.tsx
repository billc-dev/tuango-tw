import React from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import { useExtraOrders } from "../hooks";
import ExtraCard from "./ExtraCard";

const index = () => {
  const limit = 16;
  const { data, fetchNextPage, hasNextPage } = useExtraOrders(limit);
  const ordersLength = data?.pages.reduce(
    (sum, page) => page.data.orders.length + sum,
    0
  );
  return (
    <InfiniteScroll
      className="-mx-2 px-2 pb-2"
      dataLength={ordersLength || 0}
      next={() => fetchNextPage()}
      hasMore={!!hasNextPage}
      loader={<></>}
    >
      {data?.pages.map((page) =>
        page.data.orders.map((order) => (
          <ExtraCard key={order._id} order={order} />
        ))
      )}
    </InfiniteScroll>
  );
};

export default index;
