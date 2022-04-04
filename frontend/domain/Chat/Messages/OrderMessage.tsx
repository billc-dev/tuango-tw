import React, { FC } from "react";

import NormalOrderCard from "domain/Order/UserOrders/NormalOrderCard";

import { IMessage } from "../types";

interface Props {
  message: IMessage;
  isUserMessage: boolean;
}

const OrderMessage: FC<Props> = ({ message, isUserMessage }) => {
  if (!message.order || typeof message.order === "string") return null;
  const { order } = message;
  return (
    <div className={`-my-1 ${isUserMessage && "order-last"}`}>
      <NormalOrderCard order={order} />
    </div>
  );
};

export default OrderMessage;
