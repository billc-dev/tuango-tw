import React, { FC, useState } from "react";

import { XCircleIcon } from "@heroicons/react/outline";
import toast from "react-hot-toast";

import Button from "components/Button";
import IconButton from "components/Button/IconButton";
import Header from "components/Card/CardHeader";
import NormalDialog from "components/Dialog/NormalDialog";
import { IPost } from "domain/Post/types";
import { User } from "domain/User/types";
import { getFullDate } from "services/date";

import { useDeleteOrder } from "../hooks";
import { IOrder } from "../types";

interface Props {
  order: IOrder;
  user?: User;
  post?: IPost;
}

const OrderListItem: FC<Props> = ({ order, user, post }) => {
  const [open, setOpen] = useState(false);
  const deleteOrder = useDeleteOrder();

  const isDeletable = () => {
    if (order.userId !== user?.username) return false;
    if (order.status !== "ordered") return false;
    if (post?.status !== "open") return false;
    return true;
  };

  return (
    <>
      <Header
        img={order.pictureUrl}
        title={order.displayName}
        subtitle={getFullDate(order.createdAt)}
        action={
          isDeletable() ? (
            <IconButton
              loading={deleteOrder.isLoading}
              disabled={deleteOrder.isLoading}
              onClick={() => setOpen(true)}
            >
              <XCircleIcon className="text-zinc-500" />
              <NormalDialog
                open={open}
                setOpen={setOpen}
                title="您確定要取消這筆訂單嗎？"
              >
                <div className="flex justify-end pt-2">
                  <Button
                    size="lg"
                    variant="danger"
                    onClick={() =>
                      toast.promise(deleteOrder.mutateAsync(order._id), {
                        loading: "刪除中...",
                        success: "您的訂單已刪除！",
                        error: "刪除失敗！",
                      })
                    }
                  >
                    刪除
                  </Button>
                  <Button size="lg" onClick={() => setOpen(false)}>
                    取消
                  </Button>
                </div>
              </NormalDialog>
            </IconButton>
          ) : null
        }
      />
      <div className="-mt-2">
        序號: {order.orderNum} {order.status === "delivered" && "已到貨 🚚"}
        {order.status === "completed" && "已取貨 ✅"}
        {order.status === "missing" && "尋貨中 🔍"}
      </div>
      {order.order.map((item, index) => (
        <ul key={index} className="text-sm">
          {`${item.id}. ${item.item}+${item.qty} $${item.price}`}
        </ul>
      ))}
      {order.comment && (
        <p className="whitespace-pre pt-1 text-sm">備註: {order.comment}</p>
      )}
    </>
  );
};

export default OrderListItem;
