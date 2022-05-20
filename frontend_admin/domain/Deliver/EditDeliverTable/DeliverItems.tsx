import React, { FC } from "react";

import TableCell from "components/Table/TableCell";
import TableRow from "components/Table/TableRow";

import { OrderItem } from "../types";

interface Props {
  orders: OrderItem[];
}

const DeliverItems: FC<Props> = ({ orders }) => {
  return (
    <>
      {orders.map((item) =>
        item.qty > 0 ? (
          <TableRow key={item.id + item.item}>
            <TableCell noPadding>{item.id}</TableCell>
            <TableCell noPadding>{item.item}</TableCell>
            <TableCell noPadding>{item.qty}</TableCell>
            <TableCell noPadding>${item.amount}</TableCell>
          </TableRow>
        ) : null
      )}
    </>
  );
};

export default DeliverItems;
