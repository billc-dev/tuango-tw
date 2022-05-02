import { useRouter } from "next/router";
import React from "react";
import { FC } from "react";

import { PencilIcon } from "@heroicons/react/solid";
import { shallowPush } from "utils";

import IconButton from "components/Button/IconButton";
import Checkbox from "components/Checkbox";
import TableCell from "components/Table/TableCell";
import TableRow from "components/Table/TableRow";
import { getMonthAndDate } from "services/date";

import { getStatus, getStorageType } from "../services";
import { IPost } from "../types";

interface Props {
  post: IPost;
}

const PostRow: FC<Props> = ({ post }) => {
  const router = useRouter();
  const { postNum, title, displayName, delivered, storageType } = post;
  const { createdAt, deadline, deliveryDate, status } = post;
  const { normalTotal, extraTotal, normalFee, extraFee, orderCount } = post;
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
      <TableCell>{getStorageType(storageType)}</TableCell>
      <TableCell>{deadline.slice(-5)}</TableCell>
      <TableCell>{deliveryDate.slice(-5)}</TableCell>
      <TableCell>{getStatus(status)}</TableCell>
      <TableCell>
        {normalTotal + extraTotal > 0 && "$" + (normalTotal + extraTotal)}
      </TableCell>
      <TableCell>
        {normalFee + extraFee > 0 && "$" + (normalFee + extraFee)}
      </TableCell>
      <TableCell center>{orderCount}</TableCell>
      <TableCell>
        <IconButton
          onClick={() => {
            shallowPush(router, { ...router.query, edit_post_id: post._id });
          }}
        >
          <PencilIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default PostRow;
