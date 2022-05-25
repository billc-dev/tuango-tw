import React, { useEffect, useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import Checkbox from "components/Checkbox";
import LoadingIndicator from "components/Indicator/LoadingIndicator";
import UserQuery from "domain/User/UserQuery";

import CompleteCard from "./CompleteCard";
import { useInfiniteCompleteQuery } from "./hooks";
import { CompleteQuery } from "./types";

const limit = 10;

const CompleteHistory = () => {
  const [query, setQuery] = useState<CompleteQuery>({});
  const { data, fetchNextPage, hasNextPage, isLoading, remove } =
    useInfiniteCompleteQuery(limit, query);
  useEffect(() => {
    return () => remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <InfiniteScroll
      className="pb-4"
      loader={<></>}
      next={() => fetchNextPage()}
      hasMore={hasNextPage ?? false}
      dataLength={
        data?.pages.reduce(
          (sum, complete) => complete.completes.length + sum,
          0
        ) || 0
      }
    >
      <p className="text-2xl">取貨紀錄</p>
      <div>
        <UserQuery
          noLabel
          variant="standard"
          placeholder="名稱"
          setUser={(user) => setQuery({ userId: user.username })}
        />
        <label className="ml-2">
          <Checkbox
            checked={query.unconfirmed}
            onChange={(e) =>
              setQuery((query) => ({ ...query, unconfirmed: e.target.checked }))
            }
          />
          <span className="ml-2">未核對</span>
        </label>
      </div>
      {data?.pages.map((page) =>
        page.completes.map((complete) => (
          <CompleteCard key={complete._id} {...{ complete }} />
        ))
      )}
      <LoadingIndicator loading={isLoading} />
    </InfiniteScroll>
  );
};

export default CompleteHistory;
