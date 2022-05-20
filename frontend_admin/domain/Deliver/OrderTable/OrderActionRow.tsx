import React from "react";
import { FC } from "react";
import { useState } from "react";

import { useQueryClient } from "react-query";

import OrderHasNameButton from "components/Button/OrderHasNameButton";
import Checkbox from "components/Checkbox";
import Select from "components/Select";
import TableCell from "components/Table/TableCell";
import TableRow from "components/Table/TableRow";
import { IOrder } from "domain/Order/types";

interface Props {
  orders: IOrder[];
}

const OrderActionRow: FC<Props> = ({ orders }) => {
  const queryClient = useQueryClient();
  const queryKey = [
    "postOrders",
    { postId: orders[0].postId, status: "ordered" },
  ];
  const [hasName, setHasName] = useState(false);
  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const orders = queryClient.getQueryData<IOrder[]>(queryKey);
    if (!orders) return;
    const updatedOrders = orders.map((order) => ({ ...order, checked }));
    queryClient.setQueryData<IOrder[]>(queryKey, updatedOrders);
  };
  const handleItemHasNameChange = () => {
    const orders = queryClient.getQueryData<IOrder[]>(queryKey);
    if (!orders) return;
    const updatedOrders = orders.map((order) => {
      if (!order.checked) return order;
      const orderItems = order.order.map((ordItem) => ({
        ...ordItem,
        hasName: !hasName,
      }));
      return { ...order, order: orderItems };
    });
    queryClient.setQueryData<IOrder[]>(queryKey, updatedOrders);
    setHasName(!hasName);
  };
  const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const orders = queryClient.getQueryData<IOrder[]>(queryKey);
    if (!orders) return;
    const updatedOrders = orders.map((order) => {
      if (!order.checked) return order;
      const orderItems = order.order.map((ordItem) => ({
        ...ordItem,
        [name]: value,
      }));
      return { ...order, order: orderItems };
    });
    queryClient.setQueryData<IOrder[]>(queryKey, updatedOrders);
  };
  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checkboxSize="large"
          checked={!orders.some((order) => !order.checked)}
          onChange={handleCheckAll}
        />
      </TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell>
        <OrderHasNameButton
          className="max-w-[60px]"
          short
          {...{ hasName }}
          onClick={handleItemHasNameChange}
        />
      </TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell noPadding>
        <Select
          className="max-w-[104px]"
          height="normal"
          name="status"
          onChange={handleItemChange}
          options={[
            { label: "已下訂 🦓", value: "ordered" },
            { label: "已到貨 🚚", value: "delivered" },
            { label: "已取消 ❌", value: "canceled" },
          ]}
        />
      </TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
};

export default OrderActionRow;
