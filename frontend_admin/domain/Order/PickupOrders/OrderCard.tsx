import React, { FC, useState } from "react";

import { PencilIcon } from "@heroicons/react/outline";

import Button from "components/Button";
import IconButton from "components/Button/IconButton";
import Card from "components/Card";
import Table from "components/Table/Table";
import TableBody from "components/Table/TableBody";
import TableCell from "components/Table/TableCell";
import TableRow from "components/Table/TableRow";
import { IOrder } from "domain/Order/types";
import { getPostTitle } from "domain/Post/services";
import { getFullDate } from "services/date";

import EditOrderDialog from "./EditOrderDialog";

interface Props {
  order: IOrder;
  username: string;
}

const OrderCard: FC<Props> = ({ order, username }) => {
  const [open, setOpen] = useState(false);
  return (
    <Card className="px-1 pt-2 bg-white border-t border-zinc-300 rounded-none">
      <p className="text-sm">🛒 {getPostTitle(order)}</p>
      <p className="text-sm">
        {getFullDate(order.deliveredAt ?? order.createdAt)}
      </p>
      <p className="text-sm">序號: {order.orderNum}</p>
      {order.comment && <p className="font-medium">備註: {order.comment}</p>}
      {order.hasName && (
        <Button className="mt-2" variant="primary">
          有貼名字
        </Button>
      )}
      <div className="flex items-center">
        <Table>
          <TableBody>
            {order.order.map((item, index) => (
              <TableRow key={item.id + item.item + index}>
                {item.status === "completed" ? (
                  <>
                    <TableCell noPadding className="w-7/12 text-sm">
                      <div className="flex items-center justify-between">
                        <p className={`${item.qty > 1 && "font-semibold"}`}>
                          {item.id}.{item.item}+{item.qty} $
                          {item.price * item.qty}
                        </p>
                        {item.hasName && (
                          <Button variant="primary">
                            <p>有貼名字</p>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {item.location && `📍 ${item.location}`}
                    </TableCell>
                  </>
                ) : (
                  <TableCell className="text-sm">
                    {item.id}. 狀態:
                    {item.status === "delivered" && "已到貨 🚚"}
                    {item.status === "missing" && "尋貨中 🔍"}
                    {item.status === "canceled" && "已取消 ❌"}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div>
          <IconButton onClick={() => setOpen(true)}>
            <PencilIcon />
          </IconButton>
        </div>
        {open && <EditOrderDialog {...{ open, setOpen, order, username }} />}
      </div>
    </Card>
  );
};

export default OrderCard;
