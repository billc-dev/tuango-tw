import { useRouter } from "next/router";
import React, { FC, useState } from "react";

import { PencilIcon } from "@heroicons/react/outline";
import { shallowPush } from "utils";

import Button from "components/Button";
import IconButton from "components/Button/IconButton";
import Card from "components/Card";
import Table from "components/Table/Table";
import TableBody from "components/Table/TableBody";
import TableCell from "components/Table/TableCell";
import TableRow from "components/Table/TableRow";
import { IOrder } from "domain/Order/types";
import { getFullDate } from "services/date";

import { getOrderTitle } from "../services";
import EditOrderDialog from "./EditOrderDialog";

interface Props {
  order: IOrder;
  username: string;
}

const OrderCard: FC<Props> = ({ order, username }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <Card className="px-1 pt-2 bg-white border-t border-zinc-300 rounded-none">
      <p
        className="text-sm cursor-pointer"
        onClick={() => {
          shallowPush(router, { ...router.query, postId: order.postId });
        }}
      >
        π {getOrderTitle(order)}
      </p>
      <p className="text-sm">
        {getFullDate(order.deliveredAt ?? order.createdAt)}
      </p>
      <p className="text-sm">εΊθ: {order.orderNum}</p>
      {order.comment && <p className="font-medium">εθ¨»: {order.comment}</p>}
      {order.hasName && (
        <Button className="mt-2" variant="primary">
          ζθ²Όεε­
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
                            <p>ζθ²Ό</p>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {item.location && `π ${item.location}`}
                    </TableCell>
                  </>
                ) : (
                  <TableCell className="text-sm">
                    {item.id}. ηζ:
                    {item.status === "delivered" && "ε·²ε°θ²¨ π"}
                    {item.status === "missing" && "ε°θ²¨δΈ­ π"}
                    {item.status === "canceled" && "ε·²εζΆ β"}
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
