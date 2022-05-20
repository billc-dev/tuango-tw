import React, { FC, Fragment, useState } from "react";

import { PencilIcon } from "@heroicons/react/outline";
import { useQueryClient } from "react-query";

import IconButton from "components/Button/IconButton";
import OrderHasNameButton from "components/Button/OrderHasNameButton";
import Checkbox from "components/Checkbox";
import Select from "components/Select";
import TableCell from "components/Table/TableCell";
import TableRow from "components/Table/TableRow";
import TextField from "components/TextField";
import { IOrder } from "domain/Order/types";

import EditOrderDialog from "./EditOrderDialog";

interface Props {
  order: IOrder;
}

const OrderRow: FC<Props> = ({ order }) => {
  const queryClient = useQueryClient();
  const queryKey = ["postOrders", { postId: order.postId, status: "ordered" }];
  const [open, setOpen] = useState(false);
  const { orderNum, displayName, hasName } = order;
  const handleCheck = () => {
    const orders = queryClient.getQueryData<IOrder[]>(queryKey);
    if (!orders) return;
    const updatedOrders = orders.map((ord) => {
      if (ord._id !== order._id) return ord;
      return { ...order, checked: !ord.checked };
    });
    queryClient.setQueryData<IOrder[]>(queryKey, updatedOrders);
  };
  const handleHasName = () => {
    const orders = queryClient.getQueryData<IOrder[]>(queryKey);
    if (!orders) return;
    const updatedOrders = orders.map((ord) => {
      if (ord._id !== order._id) return ord;
      return { ...order, hasName: !ord.hasName };
    });
    queryClient.setQueryData<IOrder[]>(queryKey, updatedOrders);
  };
  const handleItemHasName = (index: number) => {
    return () => {
      const orders = queryClient.getQueryData<IOrder[]>(queryKey);
      if (!orders) return;
      const updatedOrders = orders.map((ord) => {
        if (ord._id !== order._id) return ord;
        const orderItems = order.order.map((ordItem, idx) => {
          if (idx !== index) return ordItem;
          return { ...ordItem, hasName: !ordItem.hasName };
        });
        return { ...order, order: orderItems };
      });
      queryClient.setQueryData<IOrder[]>(queryKey, updatedOrders);
    };
  };
  const handleItemChange = (index: number) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      const orders = queryClient.getQueryData<IOrder[]>(queryKey);
      if (!orders) return;
      const updatedOrders = orders.map((ord) => {
        if (ord._id !== order._id) return ord;
        const orderItems = order.order.map((ordItem, idx) => {
          if (idx !== index) return ordItem;
          return { ...ordItem, [name]: value };
        });
        return { ...order, order: orderItems };
      });
      queryClient.setQueryData<IOrder[]>(queryKey, updatedOrders);
    };
  };
  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checkboxSize="large"
          checked={order.checked}
          onChange={handleCheck}
        />
      </TableCell>
      <TableCell>{orderNum}</TableCell>
      <TableCell>{displayName}</TableCell>
      <TableCell>
        {hasName ? (
          <OrderHasNameButton
            className="max-w-[60px]"
            short
            {...{ hasName }}
            onClick={handleHasName}
          />
        ) : (
          order.order.map((item, index) => (
            <OrderHasNameButton
              className="my-2 max-w-[60px]"
              key={index}
              short
              hasName={item.hasName}
              onClick={handleItemHasName(index)}
            />
          ))
        )}
      </TableCell>
      <TableCell>
        {order.order.map((item, index) => (
          <p key={index} className="my-4">
            {item.id}+{item.qty}
          </p>
        ))}
      </TableCell>
      <TableCell>
        {order.order.map((item, index) => (
          <Fragment key={index}>
            <TextField
              name="price"
              type="number"
              placeholder="單價"
              value={item.price}
              noLabel
              className="hidden sm:block max-w-[60px] h-9"
              variant="standard"
              onChange={handleItemChange(index)}
            />
            <p className="sm:hidden my-4">${item.price}</p>
          </Fragment>
        ))}
      </TableCell>
      <TableCell>
        <div className="sm:pt-3">
          {order.order.map((item, index) => (
            <Select
              className="block min-w-[84px] my-3 max-w-[104px]"
              key={index}
              value={item.status}
              name="status"
              onChange={handleItemChange(index)}
              options={[
                { label: "已下訂 🦓", value: "ordered" },
                { label: "已到貨 🚚", value: "delivered" },
                { label: "已取消 ❌", value: "canceled" },
              ]}
            />
          ))}
        </div>
      </TableCell>
      <TableCell>
        <IconButton onClick={() => setOpen(true)}>
          <PencilIcon />
        </IconButton>
        {open && (
          <EditOrderDialog
            handleClose={() => setOpen(false)}
            {...{ open, order }}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

export default OrderRow;
