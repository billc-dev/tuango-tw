import React, { FC, useState } from "react";

import { PlusIcon, XIcon } from "@heroicons/react/outline";
import { useQueryClient } from "react-query";

import { IUser } from "api/auth/userDB";
import Button from "components/Button";
import IconButton from "components/Button/IconButton";
import CardHeader from "components/Card/CardHeader";
import Dialog from "components/Dialog";
import Select from "components/Select";
import Table from "components/Table/Table";
import TableBody from "components/Table/TableBody";
import TableCell from "components/Table/TableCell";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TextField from "components/TextField";
import { useCreateOrder } from "domain/Order/hooks";
import { IOrder, IOrderedOrderItem } from "domain/Order/types";
import { IPost } from "domain/Post/types";
import UserQuery from "domain/User/UserQuery";

interface Props {
  open: boolean;
  handleClose: () => void;
  post: IPost;
}

const CreateDialog: FC<Props> = ({ open, handleClose, post }) => {
  const queryClient = useQueryClient();
  const createOrder = useCreateOrder();
  const [item_id, setItem_id] = useState(post.items[0]._id);
  const [user, setUser] = useState<IUser>();
  const [comment, setComment] = useState("");
  const [orderItems, setOrderItems] = useState<IOrderedOrderItem[]>(
    post.items.map((i) => {
      const { id, item, price } = i;
      return {
        id,
        item,
        price,
        qty: "",
      };
    })
  );
  const handleChange = (index: number) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setOrderItems((orderItems) => {
        return orderItems.map((item, i) => {
          if (i !== index) return item;
          return { ...item, [name]: value };
        });
      });
    };
  };
  const handleAdd = () => {
    const postItem = post.items.find((item) => item._id === item_id);
    if (!postItem) return;
    const { id, item, price } = postItem;
    const newItem: IOrderedOrderItem = {
      id,
      item,
      price,
      qty: "",
    };
    setOrderItems((orderItems) => [...orderItems, newItem]);
  };
  const handleDelete = (index: number) => {
    return () => {
      setOrderItems((orderItems) => orderItems.filter((_, i) => i !== index));
    };
  };
  const handleSubmit = () => {
    if (!user) return;
    createOrder.mutate(
      {
        userId: user._id,
        postId: post._id,
        orderItems: orderItems.filter((item) => item.qty > 0),
        comment,
      },
      {
        onSuccess: (order) => {
          const queryKey = [
            "postOrders",
            { postId: post._id, status: "ordered" },
          ];
          const orders = queryClient.getQueryData<IOrder[]>(queryKey);
          if (!orders) return;
          queryClient.setQueryData<IOrder[]>(queryKey, [...orders, order]);
          handleClose();
        },
      }
    );
  };
  return (
    <Dialog
      title="新增訂單"
      {...{ open, handleClose }}
      action={
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={orderItems.filter((item) => item.qty > 0).length === 0}
        >
          新增訂單
        </Button>
      }
    >
      <div className="my-2">
        <UserQuery
          fullWidth
          noLabel
          variant="standard"
          placeholder="名稱"
          setUser={setUser}
        />
        {user && (
          <>
            <CardHeader
              title={`${user.pickupNum}. ${user.displayName}`}
              img={user.pictureUrl}
            />
            <Table className="text-sm">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell noPadding>商品名稱</TableCell>
                  <TableCell noPadding>數量</TableCell>
                  <TableCell noPadding>單價</TableCell>
                  <TableCell className="text-center">刪除</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell noPadding>
                      <TextField
                        className="w-28"
                        name="item"
                        variant="standard"
                        value={item.item}
                        noLabel
                        placeholder="商品名稱"
                        onChange={handleChange(index)}
                      />
                    </TableCell>
                    <TableCell noPadding>
                      <TextField
                        className="w-16"
                        name="qty"
                        variant="standard"
                        type="number"
                        value={item.qty}
                        noLabel
                        placeholder="數量"
                        onChange={handleChange(index)}
                      />
                    </TableCell>
                    <TableCell noPadding>
                      <TextField
                        className="w-16"
                        name="item"
                        variant="standard"
                        type="number"
                        value={item.price}
                        noLabel
                        placeholder="單價"
                        onChange={handleChange(index)}
                      />
                    </TableCell>
                    <TableCell noPadding>
                      <IconButton onClick={handleDelete(index)}>
                        <XIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-2">
              <p>新增商品</p>
              <div className="flex">
                <div className="w-1/2">
                  <Select
                    name="status"
                    value={item_id}
                    className="mb-0"
                    height="normal"
                    options={post.items.map((item) => ({
                      label: `${item.id}. ${item.item}`,
                      value: item._id,
                    }))}
                    onChange={(e) => setItem_id(e.target.value)}
                  />
                </div>
                <IconButton onClick={() => handleAdd()}>
                  <PlusIcon />
                </IconButton>
              </div>
            </div>
            <TextField
              name="comment"
              value={comment}
              color="grey"
              placeholder="備註"
              noLabel
              className="mt-4"
              onChange={(e) => setComment(e.target.value)}
            />
          </>
        )}
      </div>
    </Dialog>
  );
};

export default CreateDialog;
