import React, { FC, useState } from "react";

import { useQueryClient } from "react-query";

import Button from "components/Button";
import OrderHasNameButton from "components/Button/OrderHasNameButton";
import Dialog from "components/Dialog";
import Select from "components/Select";
import Table from "components/Table/Table";
import TableBody from "components/Table/TableBody";
import TableCell from "components/Table/TableCell";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TextField from "components/TextField";
import TextArea from "components/TextField/TextArea";
import AddItem from "domain/Order/PickupOrders/AddItem";
import { getOrderTitle } from "domain/Order/services";
import { IOrder } from "domain/Order/types";
import { usePostItems } from "domain/Post/hooks";

import { useHandleEditOrders } from "../services";

interface Props {
  open: boolean;
  order: IOrder;
  handleClose: () => void;
}

const EditOrderDialog: FC<Props> = ({ open, handleClose, ...props }) => {
  const queryClient = useQueryClient();
  const postItemsQuery = usePostItems(props.order.postId);
  const [order, setOrder] = useState(props.order);
  const { handleChange, handleItemChange, handleItemHasName } =
    useHandleEditOrders(setOrder);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queryKey = [
      "postOrders",
      { postId: order.postId, status: "ordered" },
    ];
    const orders = queryClient.getQueryData<IOrder[]>(queryKey);
    if (!orders) return;
    const updatedOrders = orders.map((ord) => {
      if (ord._id === order._id) return order;
      return ord;
    });
    queryClient.setQueryData<IOrder[]>(queryKey, updatedOrders);
    handleClose();
  };
  return (
    <Dialog
      title="編輯訂單"
      action={
        <Button variant="primary" form="order-form" type="submit" size="lg">
          編輯訂單
        </Button>
      }
      {...{ open, handleClose }}
    >
      <form id="order-form" onSubmit={handleSubmit}>
        <div className="mt-2">
          <p className="text-base">{getOrderTitle(order)}</p>
          <div className="overflow-y-auto">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>商品名稱</TableCell>
                  <TableCell>有貼名字</TableCell>
                  <TableCell>數量</TableCell>
                  <TableCell>單價</TableCell>
                  <TableCell>狀態</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.order.map((item, index) => (
                  <TableRow key={item.id + index}>
                    <TableCell noPadding>{item.id}</TableCell>
                    <TableCell noPadding>
                      <TextField
                        className="w-20"
                        name="item"
                        placeholder="商品名稱"
                        noLabel
                        variant="standard"
                        value={item.item}
                        onChange={handleItemChange(index)}
                      />
                    </TableCell>
                    <TableCell>
                      <OrderHasNameButton
                        className="max-w-[60px]"
                        key={index}
                        short
                        hasName={item.hasName}
                        onClick={handleItemHasName(index)}
                      />
                    </TableCell>
                    <TableCell noPadding>
                      <TextField
                        className="w-12"
                        type="number"
                        name="qty"
                        placeholder="數量"
                        noLabel
                        variant="standard"
                        value={item.qty}
                        onChange={handleItemChange(index)}
                      />
                    </TableCell>
                    <TableCell noPadding>
                      <TextField
                        className="w-14"
                        type="number"
                        name="price"
                        placeholder="單價"
                        noLabel
                        variant="standard"
                        value={item.price}
                        onChange={handleItemChange(index)}
                      />
                    </TableCell>
                    <TableCell noPadding className="min-w-[100px] align-bottom">
                      <Select
                        height="normal"
                        name="status"
                        value={item.status}
                        options={[
                          { label: "已下訂 🦓", value: "ordered" },
                          { label: "已到貨 🚚", value: "delivered" },
                          { label: "已取消 ❌", value: "canceled" },
                        ]}
                        onChange={handleItemChange(index)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {postItemsQuery.data && (
            <AddItem
              status="ordered"
              {...{ items: postItemsQuery.data, setOrder }}
            />
          )}
          <TextArea
            className="mt-4"
            name="comment"
            value={order.comment}
            hiddenLabel
            minRows={1}
            color="grey"
            placeholder="備註"
            onChange={handleChange}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default EditOrderDialog;
