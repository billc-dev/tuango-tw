import React, { FC } from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import { useNormalUserOrders } from "../hooks";
import NormalCardSkeleton from "./NormalCardSkeleton";
import NormalOrderCard from "./NormalOrderCard";

interface Props {
  status: "ordered" | "delivered" | "missing" | "canceled";
  type?: "sendMessage";
}

const NormalOrders: FC<Props> = ({ status, type }) => {
  const limit = 16;
  const ordersQuery = useNormalUserOrders(limit, status);
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    ordersQuery;
  const ordersLength = ordersQuery.data?.pages.reduce(
    (sum, page) => page.data.orders.length + sum,
    0
  );
  const getSum = () => {
    if (!ordersQuery.data) return;
    return ordersQuery.data.pages.reduce(
      (sum, page) =>
        sum +
        page.data.orders.reduce(
          (orderSum, order) =>
            orderSum +
            order.order.reduce(
              (itemSum, item) => itemSum + item.price * item.qty,
              0
            ),
          0
        ),
      0
    );
  };
  return (
    <div className="max-w-md mx-auto mb-4">
      <InfiniteScroll
        dataLength={ordersLength || 0}
        next={() => fetchNextPage()}
        hasMore={!!hasNextPage}
        loader={<></>}
      >
        {data?.pages.map((page) =>
          page.data.orders.map((order) => (
            <NormalOrderCard key={order._id} order={order} type={type} />
          ))
        )}
      </InfiniteScroll>
      {(isLoading || isFetchingNextPage) &&
        [...Array(limit)].map((_, index) => <NormalCardSkeleton key={index} />)}
      {!isLoading && data?.pages[0].data.orders.length === 0 && (
        <p className="text-center text-xl py-2">
          您目前沒有
          {status === "ordered" && "已下訂"}
          {status === "delivered" && "已到貨"}
          {status === "missing" && "尋貨中"}
          {status === "canceled" && "已取消"}
          的訂單
        </p>
      )}
      {status === "delivered" && !!ordersLength && (
        <div className="text-center text-white text-xl bg-line-400 rounded-lg py-1 mx-2">
          合計{`$${getSum()}`}
        </div>
      )}
    </div>
  );
};

export default NormalOrders;
