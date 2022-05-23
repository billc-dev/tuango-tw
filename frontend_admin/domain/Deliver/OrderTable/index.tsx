import React, { FC } from "react";

import Table from "components/Table/Table";
import TableBody from "components/Table/TableBody";
import TableHead from "components/Table/TableHead";
import { IOrder } from "domain/Order/types";

import OrderActionRow from "./OrderActionRow";
import OrderHead from "./OrderHead";
import OrderRow from "./OrderRow";

interface Props {
  orders: IOrder[];
}

const OrderTable: FC<Props> = ({ orders }) => {
  return (
    <div className="overflow-y-auto text-sm">
      <Table>
        <TableHead>
          <OrderHead />
          {orders.length > 0 && <OrderActionRow {...{ orders }} />}
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <OrderRow key={order._id} {...{ order }} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderTable;
