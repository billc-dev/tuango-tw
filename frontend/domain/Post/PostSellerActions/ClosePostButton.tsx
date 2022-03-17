import React, { FC, useState } from "react";

import { CheckCircleIcon } from "@heroicons/react/solid";
import toast from "react-hot-toast";

import Button from "components/Button";

import { useClosePost } from "../hooks";
import { PostStatus } from "../types";

interface Props {
  postId: string;
  status: PostStatus;
}

const ClosePostButton: FC<Props> = ({ postId, status }) => {
  const closePost = useClosePost();
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    toast.loading("結單中...", { id: "closePost" });
    closePost.mutate(postId, {
      onSettled: () => {
        setLoading(false);
      },
    });
  };
  return (
    <Button
      icon={<CheckCircleIcon />}
      loading={loading}
      disabled={status !== "open"}
      size="lg"
      variant="orange"
      className="mt-2"
      fullWidth
      onClick={handleClick}
    >
      {status === "open" ? "結單" : "已結單"}
    </Button>
  );
};

export default ClosePostButton;
