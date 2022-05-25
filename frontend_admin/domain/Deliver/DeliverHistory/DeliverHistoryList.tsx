import React, { useEffect, useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import LoadingIndicator from "components/Indicator/LoadingIndicator";
import UserQuery from "domain/User/UserQuery";
import { getNumberWithCommas } from "services/math";

import { useInfiniteDeliverQuery } from "../hooks";
import { DeliverQuery, IDeliver } from "../types";
import DeliverCard from "./DeliverCard";

const limit = 10;

const DeliverHistoryList = () => {
  const [query, setQuery] = useState<DeliverQuery>({});
  const { data, fetchNextPage, hasNextPage, isLoading, remove } =
    useInfiniteDeliverQuery(limit, query);
  const [checkedDelivers, setCheckedDelivers] = useState<IDeliver[]>([]);
  const sum = checkedDelivers.reduce(
    (sum, deliver) =>
      (sum +=
        deliver.normalTotal +
        deliver.extraTotal -
        deliver.normalFee -
        deliver.extraFee),
    0
  );
  useEffect(() => {
    return () => remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <InfiniteScroll
        className="pb-4"
        loader={<></>}
        next={() => fetchNextPage()}
        hasMore={hasNextPage ?? false}
        dataLength={
          data?.pages.reduce((sum, page) => page.delivers.length + sum, 0) || 0
        }
      >
        <p className="text-2xl">進貨紀錄</p>
        <div>
          <UserQuery
            noLabel
            isSeller
            variant="standard"
            placeholder="賣家名稱"
            setUser={(user) => setQuery({ userId: user.username })}
          />
        </div>
        {data?.pages.map((page) =>
          page.delivers.map((deliver) => (
            <DeliverCard
              key={deliver._id}
              {...{ deliver, checkedDelivers, setCheckedDelivers }}
            />
          ))
        )}
        <LoadingIndicator loading={isLoading} />
      </InfiniteScroll>
      {checkedDelivers.length > 0 && (
        <div className="fixed left-0 bottom-3 w-full">
          <div className="bg-zinc-800 text-white mx-2 shadow-lg rounded px-3.5 py-4">
            {`總計$${getNumberWithCommas(sum)} 單數:${checkedDelivers.length}`}
          </div>
        </div>
      )}
    </>
  );
};

export default DeliverHistoryList;
