import { useRouter } from "next/router";
import React, { useState } from "react";

import Dialog from "components/Dialog";
import TabButton from "components/Tab/TabButton";
import TabContainer from "components/Tab/TabContainer";
import NormalOrders from "domain/Order/UserOrders/NormalOrders";
import { shallowPush } from "utils/routing";

type NormalStatus = "ordered" | "delivered" | "missing" | "canceled";

const SendOrder = () => {
  const router = useRouter();
  const [status, setStatus] = useState<NormalStatus>("ordered");
  const handleClose = () => {
    const { send_order, ...query } = router.query;
    shallowPush(router, query);
  };
  return (
    <Dialog title="傳送訂單" open handleClose={handleClose}>
      <TabContainer className="mt-2">
        <TabButton
          selected={status === "ordered"}
          onClick={() => setStatus("ordered")}
        >
          已下訂
        </TabButton>
        <TabButton
          selected={status === "delivered"}
          onClick={() => setStatus("delivered")}
        >
          已到貨
        </TabButton>
        <TabButton
          selected={status === "missing"}
          onClick={() => setStatus("missing")}
        >
          尋貨中
        </TabButton>
        <TabButton
          selected={status === "canceled"}
          onClick={() => setStatus("canceled")}
        >
          已取消
        </TabButton>
      </TabContainer>
      <NormalOrders status={status} type="sendMessage" />
    </Dialog>
  );
};

export default SendOrder;
