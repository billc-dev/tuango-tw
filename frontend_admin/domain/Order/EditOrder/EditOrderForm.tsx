import React, { FC, useState } from "react";

import Button from "components/Button";
import OrderHasNameButton from "components/Button/OrderHasNameButton";
import Select from "components/Select";
import Table from "components/Table/Table";
import TableBody from "components/Table/TableBody";
import TableCell from "components/Table/TableCell";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TextField from "components/TextField";
import TextArea from "components/TextField/TextArea";
import { useHandleEditOrders } from "domain/Deliver/services";
import { usePostItems } from "domain/Post/hooks";
import { getFullLengthDate } from "services/date";

import AddItem from "../PickupOrders/AddItem";
import { useUpdateOrder } from "../hooks";
import { getOrderStatusLabel, getOrderTitle } from "../services";
import { IOrder } from "../types";

interface Props {
  order: IOrder;
  handleClose: () => void;
}

const EditOrderForm: FC<Props> = (props) => {
  const postItemsQuery = usePostItems(props.order.postId);
  const updateOrder = useUpdateOrder();
  const [order, setOrder] = useState(props.order);
  const { displayName, createdAt } = order;
  const { handleChange, handleItemChange, handleItemHasName } =
    useHandleEditOrders(setOrder);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateOrder.mutate(order, { onSuccess: () => props.handleClose() });
  };
  return (
    <form id="order-form" onSubmit={handleSubmit}>
      <div className="-mx-2 px-2">
        <p className="text-2xl">{displayName}</p>
        <p>{getOrderTitle(order)}</p>
        <p>{getFullLengthDate(createdAt)}</p>
        <div className="overflow-y-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>商品名稱</TableCell>
                <TableCell>有貼名字</TableCell>
                <TableCell>數量</TableCell>
                <TableCell>單價</TableCell>
                <TableCell>位置</TableCell>
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
                    <Button
                      fullWidth
                      className="whitespace-nowrap"
                      variant={item.hasName ? "primary" : undefined}
                      onClick={handleItemHasName(index)}
                    >
                      {item.hasName ? "有貼" : "沒貼"}
                    </Button>
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
                      className="w-12"
                      type="number"
                      name="price"
                      placeholder="單價"
                      noLabel
                      variant="standard"
                      value={item.price}
                      onChange={handleItemChange(index)}
                    />
                  </TableCell>
                  <TableCell noPadding>
                    <TextField
                      className="w-20"
                      name="location"
                      placeholder="位置"
                      noLabel
                      variant="standard"
                      value={item.location}
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
                        { label: "已取貨 ✅", value: "completed" },
                        { label: "尋貨中 🔍", value: "missing" },
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
        <OrderHasNameButton
          className="mt-4"
          fullWidth
          hasName={order.hasName}
          onClick={() =>
            setOrder((order) => ({ ...order, hasName: !order.hasName }))
          }
        />
        {postItemsQuery.data && (
          <AddItem {...{ items: postItemsQuery.data, setOrder }} />
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
        <p className="text-2xl">訂單記錄</p>
        {order.orderHistory.map((history, index) => (
          <p key={index}>
            {getOrderStatusLabel(history.status)}{" "}
            {getFullLengthDate(history.createdAt)}
          </p>
        ))}
      </div>
    </form>
  );
};

export default EditOrderForm;
