import { useRouter } from "next/router";
import React, { useState } from "react";
import { FC } from "react";
import { useEffect } from "react";

import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { PencilIcon } from "@heroicons/react/solid";
import { shallowPush } from "utils";

import Button from "components/Button";
import IconButton from "components/Button/IconButton";
import Checkbox from "components/Checkbox";
import Select from "components/Select";
import TableCell from "components/Table/TableCell";
import TableRow from "components/Table/TableRow";
import { getMonthAndDate } from "services/date";

import { useEditPostStatus } from "../hooks";
import { getStatus, getStorageType } from "../services";
import { IPost } from "../types";

interface Props {
  post: IPost;
}

const PostRow: FC<Props> = ({ post }) => {
  const router = useRouter();
  const [status, setStatus] = useState(post.status);
  const [editStatus, setEditStatus] = useState(false);
  const editPostStatus = useEditPostStatus();
  const { postNum, title, displayName, delivered, storageType } = post;
  const { createdAt, deadline, deliveryDate } = post;
  const { normalTotal, extraTotal, normalFee, extraFee, orderCount } = post;
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as IPost["status"]);
  };
  const handleClose = () => {
    setStatus(post.status);
    setEditStatus(false);
  };
  useEffect(() => setStatus(post.status), [post]);
  return (
    <TableRow>
      <TableCell>{postNum}</TableCell>
      <TableCell>{getMonthAndDate(createdAt)}</TableCell>
      <TableCell>
        <p className="lg:line-clamp-1">{title}</p>
      </TableCell>
      <TableCell className="max-w-[250px]">
        <p className="lg:line-clamp-1">{displayName}</p>
      </TableCell>
      <TableCell center>
        <Checkbox
          onChange={() => {}}
          checked={delivered}
          checkboxSize="large"
        />
      </TableCell>
      <TableCell className="pl-2">{getStorageType(storageType)}</TableCell>
      <TableCell>{deadline.slice(-5)}</TableCell>
      <TableCell>{deliveryDate.slice(-5)}</TableCell>
      <TableCell>
        {editStatus ? (
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
      </TableCell>
      <TableCell>
        {normalTotal + extraTotal > 0 && "$" + (normalTotal + extraTotal)}
      </TableCell>
      <TableCell>
        {normalFee + extraFee > 0 && "$" + (normalFee + extraFee)}
      </TableCell>
      <TableCell center>{orderCount}</TableCell>
      <TableCell>
        <IconButton
          onClick={() =>
            shallowPush(router, { ...router.query, edit_post_id: post._id })
          }
        >
          <PencilIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default PostRow;
