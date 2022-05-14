import React, { FC, useState } from "react";

import { useQueryClient } from "react-query";

import Select from "components/Select";

import { IOrder, OrderStatus } from "../types";

interface Props {
  username: string;
}

const BatchChangeOrderStatus: FC<Props> = ({ username }) => {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<OrderStatus>("completed");
  const batchChangeOrderStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const orders = queryClient.getQueryData<IOrder[]>([
      "pickupOrders",
      username,
    ]);
    if (!orders) return;
    const updatedOrders = orders.map((order) => ({
      ...order,
      order: order.order.map((item) => ({ ...item, status: e.target.value })),
    })) as IOrder[];
    queryClient.setQueryData<IOrder[]>(
      ["pickupOrders", username],
      updatedOrders
    );
    setStatus(e.target.value as OrderStatus);
  };
  return (
    <Select
      name="status"
      value={status}
      variant="contained"
      onChange={batchChangeOrderStatus}
      options={[
        { label: "已到貨 🚚", value: "delivered" },
        { label: "已取貨 ✅", value: "completed" },
        { label: "尋貨中 🔍", value: "missing" },
        { label: "已取消 ❌", value: "canceled" },
      ]}
    />
  );
};

export default BatchChangeOrderStatus;
