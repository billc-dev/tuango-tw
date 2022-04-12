import React, { FC, useState } from "react";

import { TrashIcon } from "@heroicons/react/outline";
import toast from "react-hot-toast";

import Button from "components/Button";
import IconButton from "components/Button/IconButton";
import NormalDialog from "components/Dialog/NormalDialog";

import { useDeletePost } from "../hooks";

interface Props {
  postId: string;
}

const DeletePostButton: FC<Props> = ({ postId }) => {
  const deletePost = useDeletePost();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDelete = () => {
    setLoading(true);
    toast.loading("刪除中...", { id: "deletePost" });
    setOpen(false);
    deletePost.mutate(postId, {
      onSettled: () => {
        setLoading(false);
      },
    });
  };
  return (
    <>
      <IconButton loading={loading} onClick={() => setOpen(true)}>
        <TrashIcon className="text-zinc-500" />
      </IconButton>
      <NormalDialog
        open={open}
        setOpen={setOpen}
        title="您確定要刪除這篇貼文嗎？"
      >
        <div className="flex justify-end gap-2 pt-2">
          <Button size="lg" variant="danger" onClick={() => handleDelete()}>
            刪除
          </Button>
          <Button size="lg" onClick={() => setOpen(false)}>
            取消
          </Button>
        </div>
      </NormalDialog>
    </>
  );
};

export default DeletePostButton;
