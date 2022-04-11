import React, { FC } from "react";

import Button from "components/Button";

import { useSetHasName } from "../hooks";
import { IOrder } from "../types";

interface Props {
  postId: string;
  order: IOrder;
}

const HasNameButton: FC<Props> = ({ order, postId }) => {
  const setHasName = useSetHasName(postId);
  return (
    <Button
      loading={setHasName.isLoading}
      className="mt-1 w-24"
      size="lg"
      variant={order.hasName ? "info" : undefined}
      onClick={() =>
        setHasName.mutate({ orderId: order._id, hasName: !order.hasName })
      }
    >
      {order.hasName ? "有貼名字" : "沒貼名字"}
    </Button>
  );
};

export default HasNameButton;
