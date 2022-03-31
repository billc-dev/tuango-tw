import React from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import { useCompletedUserOrders } from "../hooks";
import CompletedCard from "./CompletedCard";
import CompletedSkeleton from "./CompletedSkeleton";

const Completed = () => {
  const limit = 16;
  const ordersQuery = useCompletedUserOrders(limit, "completed");
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    ordersQuery;
  const ordersLength = ordersQuery.data?.pages.reduce(
    (sum, page) => page.data.completes.length + sum,
    0
  );

  return (
    <div className="max-w-md mx-auto">
      <InfiniteScroll
        dataLength={ordersLength || 0}
        next={() => fetchNextPage()}
        hasMore={!!hasNextPage}
        loader={<></>}
      >
        {data?.pages.map((page) =>
          page.data.completes.map((complete) => (
            <CompletedCard key={complete._id} complete={complete} />
          ))
        )}
      </InfiniteScroll>
      {(isLoading || isFetchingNextPage) &&
        [...Array(limit)].map((_, index) => <CompletedSkeleton key={index} />)}
      {!isLoading && data?.pages[0].data.completes.length === 0 && (
        <p className="text-center pt-2">您目前沒有已取貨的訂單</p>
      )}
    </div>
  );
};

export default Completed;
