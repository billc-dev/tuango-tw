import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import TabButton from "components/Tab/TabButton";
import TabContainer from "components/Tab/TabContainer";
import OrderDialog from "domain/Order/OrderDialog";
import PostDialog from "domain/Post/PostDialog";
import { SellerQuery } from "domain/Post/types";
import { shallowPush } from "utils/routing";

import OverviewTable from "./OverviewTable";

const Overview = () => {
  const router = useRouter();
  const { status, postId, orderDialog } = router.query;
  const [query, setQuery] = useState<SellerQuery>();

  useEffect(() => {
    if (!router.isReady) return;
    else if (status === "open" || status === "closed") setQuery({ status });
    else if (!status) {
      setQuery({ status: "open" });
      shallowPush(router, { ...router.query, status: "open" });
    }
  }, [router]);

  return (
    <>
      <div className="px-2 pt-2 max-w-md m-auto">
        <TabContainer>
          <TabButton
            selected={status === "open"}
            onClick={() => {
              shallowPush(router, { ...router.query, status: "open" });
            }}
          >
            未結單
          </TabButton>
          <TabButton
            selected={status === "closed"}
            onClick={() => {
              shallowPush(router, { ...router.query, status: "closed" });
            }}
          >
            已結單
          </TabButton>
        </TabContainer>
        {query?.status === "open" && <OverviewTable query={query} />}
        {query?.status === "closed" && <OverviewTable query={query} />}
        {typeof postId === "string" && <PostDialog postId={postId} />}
        {typeof orderDialog === "string" && (
          <OrderDialog postId={orderDialog} />
        )}
      </div>
    </>
  );
};

export default Overview;
