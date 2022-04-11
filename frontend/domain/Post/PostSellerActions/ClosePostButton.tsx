import React, { FC, useState } from "react";

import { CheckCircleIcon } from "@heroicons/react/solid";
import toast from "react-hot-toast";

import Button from "components/Button";
import NormalDialog from "components/Dialog/NormalDialog";

import { useClosePost } from "../hooks";
import { PostStatus } from "../types";

interface Props {
  postId: string;
  status: PostStatus;
}

const ClosePostButton: FC<Props> = ({ postId, status }) => {
  const closePost = useClosePost();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    closePost.mutate(postId, {
      onSuccess: () => {
        setOpen(false);
      },
      onError: () => {
        toast.error("結單失敗！");
      },
    });
  };

  return (
    <>
      <Button
        icon={<CheckCircleIcon />}
        loading={closePost.isLoading}
        disabled={status !== "open"}
        size="lg"
        variant="orange"
        className="mt-2"
        fullWidth
        onClick={() => setOpen(true)}
      >
        {status === "open" ? "結單" : "已結單"}
      </Button>
      <NormalDialog {...{ open, setOpen }} title="您確定要取消這筆訂單嗎？">
        <div className="flex justify-end gap-2 pt-2">
          <Button size="lg" variant="orange" onClick={handleClick}>
            結單
          </Button>
          <Button size="lg" onClick={() => setOpen(false)}>
            取消
          </Button>
        </div>
      </NormalDialog>
    </>
  );
};

export default ClosePostButton;
