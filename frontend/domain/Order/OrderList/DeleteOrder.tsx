import React, { FC, useState } from "react";

import { XCircleIcon } from "@heroicons/react/outline";
import toast from "react-hot-toast";

import Button from "components/Button";
import IconButton from "components/Button/IconButton";
import NormalDialog from "components/Dialog/NormalDialog";
import { IPost } from "domain/Post/types";
import { User } from "domain/User/types";

import { useDeleteOrder } from "../hooks";
import { IOrder } from "../types";

interface Props {
  order: IOrder;
  user?: User;
  post?: IPost;
}

const DeleteOrder: FC<Props> = ({ order, user, post }) => {
  const [open, setOpen] = useState(false);
  const deleteOrder = useDeleteOrder();
  const isDeletable = () => {
    if (order.userId !== user?.username) return false;
    if (order.status !== "ordered") return false;
    if (post?.status !== "open") return false;
    return true;
  };
  return isDeletable() ? (
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
        <div className="flex justify-end gap-2 pt-2">
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
  ) : null;
};

export default DeleteOrder;
