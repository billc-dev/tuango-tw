import { useRouter } from "next/router";
import React, { FC } from "react";

import { PencilIcon } from "@heroicons/react/solid";
import { shallowPush } from "utils";

import IconButton from "components/Button/IconButton";
import TableCell from "components/Table/TableCell";
import TableRow from "components/Table/TableRow";
import { getFullLengthDate } from "services/date";

import { getOrderStatusLabel, getOrderTitle } from "../services";
import { IOrder } from "../types";

interface Props {
  order: IOrder;
}

const OrderRow: FC<Props> = ({ order }) => {
  const router = useRouter();
  const { displayName, createdAt } = order;
  const { orderNum, status } = order;
  return (
    <TableRow>
      <TableCell>{displayName}</TableCell>
      <TableCell>
        <p>{getOrderTitle(order)}</p>
        <p>{getFullLengthDate(createdAt)}</p>
        <p>序號: {orderNum}</p>
        {order.order.map((item, index) => (
          <p key={item.id + index}>
            {item.id}.{item.item}+{item.qty}
          </p>
        ))}
      </TableCell>
      <TableCell>{getOrderStatusLabel(status)}</TableCell>
      <TableCell>
        <IconButton
          onClick={() =>
            shallowPush(router, { ...router.query, edit_order_id: order._id })
          }
        >
          <PencilIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default OrderRow;
