import React, { FC, useState } from "react";

import { PlusIcon } from "@heroicons/react/outline";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

import Button from "components/Button";
import Dialog from "components/Dialog";
import TextField from "components/TextField";

import { useCreateDeliveredExtraOrder } from "../hooks";
import { CreateOrderItem, IOrder } from "../types";
import OrderTable from "./OrderTable";

interface Props {
  open: boolean;
  handleClose: () => void;
  handleCloseExtraDialog: () => void;
  order: IOrder;
  username: string;
}

const CreateOrderDialog: FC<Props> = (props) => {
  const { open, handleClose, order, username, handleCloseExtraDialog } = props;
  const queryClient = useQueryClient();
  const createOrder = useCreateDeliveredExtraOrder();
  const [orderItems, setOrderItems] = useState<CreateOrderItem[]>(
    order.order.map((ord) => ({
      ...ord,
      qty: undefined,
      itemQty: ord.qty,
      status: "delivered",
    }))
  );
  const [comment, setComment] = useState("");
  const enabled = orderItems.some((item) => item.qty && item.qty > 0);
  const handleChange = (index: number) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setOrderItems((orderItems) => {
        return orderItems.map((item, idx) => {
          if (idx === index) return { ...item, [name]: Number(value) };
          return item;
        });
      });
    };
  };
  const handleSubmit = () => {
    const items = orderItems.filter((item) => {
      return item.qty;
    });
    createOrder.mutate(
      {
        orderItems: items,
        orderId: order._id,
        username,
        comment,
      },
      {
        onSuccess: () => {
          handleClose();
          handleCloseExtraDialog();
        },
        onError: async (err) => {
          if (!(err instanceof AxiosError)) return;
          if (err.response?.data.error !== "item quantity is over") {
            return toast.error("訂單新增失敗");
          }
          toast.error("訂單數量超過認購數量！");
          await queryClient.invalidateQueries("extraOrders");
          setOrderItems(
            order.order.map((ord) => ({
              ...ord,
              qty: "",
              itemQty: ord.qty,
            }))
          );
        },
      }
    );
  };
  return (
    <Dialog title="新增訂單" {...{ open, handleClose }}>
      <div className="mt-2">
        <p>
          #{order.postNum} {order.title} #{order.sellerDisplayName}
        </p>
        <OrderTable {...{ orderItems, handleChange }} />
        <div className="mt-4">
          <TextField
            noLabel
            placeholder="備註"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            disabled={!enabled}
            fullWidth
            size="lg"
            icon={<PlusIcon />}
            variant="primary"
            onClick={handleSubmit}
          >
            新增訂單
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default CreateOrderDialog;
