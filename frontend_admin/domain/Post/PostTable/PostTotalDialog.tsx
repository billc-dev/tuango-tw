import React, { FC } from "react";

import Dialog from "components/Dialog";
import DeliverTable from "domain/Deliver/EditDeliverTable";
import { usePostDelivers } from "domain/Deliver/hooks";

import { usePost } from "../hooks";
import { getPostTitle } from "../services";

interface Props {
  open: boolean;
  handleClose: () => void;
  postId: string;
}

const PostTotalDialog: FC<Props> = ({ open, handleClose, postId }) => {
  const postQuery = usePost(postId);
  const deliversQuery = usePostDelivers(postId);
  return (
    <Dialog {...{ open, handleClose, title: getPostTitle(postQuery.data) }}>
      {deliversQuery.data?.length === 0 && (
        <p className="text-center mt-2">您目前沒有進貨的單子</p>
      )}
      {deliversQuery.data &&
        deliversQuery.data.map((deliver) => (
          <DeliverTable key={deliver._id} deliver={deliver} />
        ))}
    </Dialog>
  );
};

export default PostTotalDialog;
