import { useRouter } from "next/router";
import React, { FC } from "react";

import { PencilIcon } from "@heroicons/react/solid";
import { shallowPush } from "utils";

import IconButton from "components/Button/IconButton";
import Checkbox from "components/Checkbox";
import TableCell from "components/Table/TableCell";
import TableRow from "components/Table/TableRow";
import { getMonthAndDate } from "services/date";

import { useSetPostDelivered } from "../hooks";
import { getPostTitle, getStorageType } from "../services";
import { IPost } from "../types";
import PostChangeTotalButton from "./PostChangeTotalButton";
import PostStatus from "./PostStatusCell";

interface Props {
  post: IPost;
}

const PostRow: FC<Props> = ({ post }) => {
  const router = useRouter();
  const setPostDelivered = useSetPostDelivered();
  const { postNum, title, displayName, delivered, storageType } = post;
  const { createdAt, deadline, deliveryDate } = post;
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
          disabled={setPostDelivered.isLoading}
          onChange={(e) =>
            setPostDelivered.mutate({
              postId: post._id,
              delivered: e.target.checked,
            })
          }
          checked={delivered}
          checkboxSize="large"
        />
      </TableCell>
      <TableCell className="pl-2">{getStorageType(storageType)}</TableCell>
      <TableCell>{deadline.slice(-5)}</TableCell>
      <TableCell>{deliveryDate.slice(-5)}</TableCell>
      <TableCell>
        <PostStatus post={post} />
      </TableCell>
      <TableCell>
        {normalTotal + extraTotal > 0 && "$" + (normalTotal + extraTotal)}
      </TableCell>
      <TableCell>
        {normalFee + extraFee > 0 && "$" + (normalFee + extraFee)}
      </TableCell>
      <TableCell>
        <PostChangeTotalButton
          postId={post._id}
          postTitle={getPostTitle(post)}
        />
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
