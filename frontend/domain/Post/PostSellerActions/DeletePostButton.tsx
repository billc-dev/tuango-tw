import React, { FC, useState } from "react";

import { TrashIcon } from "@heroicons/react/outline";
import toast from "react-hot-toast";

import IconButton from "components/Button/IconButton";

import { useDeletePost } from "../hooks";

interface Props {
  postId: string;
}

const DeletePostButton: FC<Props> = ({ postId }) => {
  const deletePost = useDeletePost();
  const [loading, setLoading] = useState(false);
  const handleDelete = () => {
    setLoading(true);
    toast.loading("刪除中...", { id: "deletePost" });
    deletePost.mutate(postId, {
      onSettled: () => {
        setLoading(false);
      },
    });
  };
  return (
    <IconButton loading={loading} onClick={handleDelete}>
      <TrashIcon className="text-zinc-500" />
    </IconButton>
  );
};

export default DeletePostButton;
