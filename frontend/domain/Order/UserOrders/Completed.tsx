import React from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import { useCompletedUserOrders } from "../hooks";
import CompletedCard from "./CompletedCard";

const Completed = () => {
  const limit = 16;
  const ordersQuery = useCompletedUserOrders(limit, "completed");
  const ordersLength = ordersQuery.data?.pages.reduce(
    (sum, page) => page.data.completes.length + sum,
    0
  );
  return (
    <div className="max-w-md mx-auto">
      <InfiniteScroll
        dataLength={ordersLength || 0}
        next={() => ordersQuery.fetchNextPage()}
        hasMore={!!ordersQuery.hasNextPage}
        loader={<></>}
      >
        {ordersQuery.data?.pages.map((page) =>
          page.data.completes.map((complete) => (
            <CompletedCard key={complete._id} complete={complete} />
          ))
        )}
      </InfiniteScroll>
      {!ordersQuery.isLoading &&
        ordersQuery.data?.pages[0].data.completes.length === 0 && (
          <p className="text-center pt-2">您目前沒有已取貨的訂單</p>
        )}
    </div>
  );
};

export default Completed;
