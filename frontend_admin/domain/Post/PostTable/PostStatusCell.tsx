import React, { FC, useEffect, useState } from "react";

import { CheckIcon, XIcon } from "@heroicons/react/outline";

import Button from "components/Button";
import PopupDialog from "components/Dialog/PopupDialog";
import Select from "components/Select";
import { useIsSmallScreen } from "hooks/useScreenWidth";

import { useEditPostStatus } from "../hooks";
import { getPostTitle, getStatus } from "../services";
import { IPost } from "../types";

interface Props {
  post: IPost;
}

const PostStatus: FC<Props> = ({ post }) => {
  const isSmallScreen = useIsSmallScreen();
  const [status, setStatus] = useState(post.status);
  const [editStatus, setEditStatus] = useState(false);
  const editPostStatus = useEditPostStatus();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as IPost["status"]);
  };
  const handleClose = () => {
    setStatus(post.status);
    setEditStatus(false);
  };
  useEffect(() => setStatus(post.status), [post]);

  return (
    <>
      {editStatus ? (
        <>
          {isSmallScreen ? (
            <>
              <Button
                fullWidth
                disabled={post.status === "canceled"}
                className="cursor-pointer"
                onClick={() => setEditStatus(true)}
              >
                {getStatus(post.status)}
              </Button>
              <PopupDialog
                open
                title={getPostTitle(post)}
                handleClose={() => setEditStatus(false)}
              >
                <div className="mt-2">
                  <p className="mb-2">狀態</p>
                  <Select
                    height="normal"
                    variant="contained"
                    name="status"
                    value={status}
                    onChange={handleChange}
                    options={[
                      { label: "未結單", value: "open" },
                      { label: "已結單", value: "closed" },
                      { label: "已完成", value: "completed" },
                      { label: "已取消", value: "canceled" },
                    ]}
                  />
                  <div className="flex justify-end mt-4">
                    <Button
                      className="mr-3"
                      loading={editPostStatus.isLoading}
                      variant="primary"
                      onClick={() =>
                        editPostStatus.mutate(
                          { postId: post._id, status },
                          { onSuccess: () => setEditStatus(false) }
                        )
                      }
                    >
                      更改
                    </Button>
                    <Button onClick={handleClose}>取消</Button>
                  </div>
                </div>
              </PopupDialog>
            </>
          ) : (
            <>
              <Select
                height="normal"
                variant="contained"
                name="status"
                value={status}
                onChange={handleChange}
                options={[
                  { label: "未結單", value: "open" },
                  { label: "已結單", value: "closed" },
                  { label: "已完成", value: "completed" },
                  { label: "已取消", value: "canceled" },
                ]}
              />
              <div
                className="flex justify-around"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  loading={editPostStatus.isLoading}
                  size="square"
                  variant="primary"
                  onClick={() =>
                    editPostStatus.mutate(
                      { postId: post._id, status },
                      { onSuccess: () => setEditStatus(false) }
                    )
                  }
                >
                  <CheckIcon className="w-6 h-6" />
                </Button>
                <Button size="square" onClick={handleClose}>
                  <XIcon className="w-6 h-6" />
                </Button>
              </div>
            </>
          )}
        </>
      ) : (
        <Button
          fullWidth
          disabled={post.status === "canceled"}
          className="cursor-pointer"
          onClick={() => setEditStatus(true)}
        >
          {getStatus(post.status)}
        </Button>
      )}
    </>
  );
};

export default PostStatus;
