import React, { FC, useState } from "react";

import { useQueryClient } from "react-query";

import Button from "components/Button";
import Dialog from "components/Dialog";
import Select from "components/Select";
import Table from "components/Table/Table";
import TableBody from "components/Table/TableBody";
import TableCell from "components/Table/TableCell";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TextField from "components/TextField";
import { usePostItems } from "domain/Post/hooks";
import { getPostTitle } from "domain/Post/services";

import { IOrder } from "../types";
import AddItem from "./AddItem";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  order: IOrder;
  username: string;
}

const EditOrderDialog: FC<Props> = ({ open, setOpen, username, ...props }) => {
  const queryClient = useQueryClient();
  const [order, setOrder] = useState(props.order);
  const postItemsQuery = usePostItems(props.order.postId);
  const handleClose = () => {
    setOpen(false);
  };
  const handleItemChange = (index: number) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setOrder((order) => {
        const orderItems = order.order.map((item, idx) => {
          if (idx === index) return { ...item, [name]: value };
          return item;
        });
        return { ...order, order: orderItems };
      });
    };
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrder((order) => ({ ...order, [name]: value }));
  };
  const handleSubmit = () => {
    const orders = queryClient.getQueryData<IOrder[]>([
      "pickupOrders",
      username,
    ]);
    if (!orders) return;
    const newOrders = orders.map((ord) => {
      if (ord._id === order._id) return order;
      return ord;
    });
    console.log(newOrders);
  };
  return (
    <Dialog title="編輯訂單" {...{ open, handleClose }}>
      <div className="mt-2">
        <p>{getPostTitle(order)}</p>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell noPadding>ID</TableCell>
              <TableCell noPadding>商品名稱</TableCell>
              <TableCell noPadding>數量</TableCell>
              <TableCell noPadding>單價</TableCell>
              <TableCell noPadding>狀態</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.order.map((item, index) => (
              <TableRow key={item.id + item.item + index}>
                <TableCell noPadding>{item.id}</TableCell>
                <TableCell noPadding>{item.item}</TableCell>
                <TableCell noPadding>
                  <TextField
                    name="qty"
                    type="number"
                    className="w-10"
                    variant="standard"
                    value={item.qty}
                    onChange={handleItemChange(index)}
                  />
                </TableCell>
                <TableCell noPadding>
                  <TextField
                    name="price"
                    type="number"
                    className="w-14"
                    variant="standard"
                    value={item.price}
                    onChange={handleItemChange(index)}
                  />
                </TableCell>
                <TableCell noPadding>
                  <Select
                    name="status"
                    value={item.status}
                    className="mb-0"
                    height="normal"
                    onChange={handleItemChange(index)}
                    options={[
                      { label: "已到貨 🚚", value: "delivered" },
                      { label: "已取貨 ✅", value: "completed" },
                      { label: "尋貨中 🔍", value: "missing" },
                      { label: "已取消 ❌", value: "canceled" },
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {postItemsQuery.data && (
          <AddItem {...{ items: postItemsQuery.data, setOrder }} />
        )}
      </div>
      <TextField
        name="comment"
        value={order.comment}
        color="grey"
        placeholder="備註"
        noLabel
        className="mb-0"
        onChange={handleChange}
      />
      <Button fullWidth variant="primary" size="lg" onClick={handleSubmit}>
        編輯訂單
      </Button>
    </Dialog>
  );
};

export default EditOrderDialog;
