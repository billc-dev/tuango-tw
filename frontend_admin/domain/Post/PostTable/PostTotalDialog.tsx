import React, { FC } from "react";

import Dialog from "components/Dialog";
import DeliverTable from "domain/Deliver/DeliverTable";
import { usePostDelivers } from "domain/Deliver/hooks";

import { getPostTitle } from "../services";
import { IPost } from "../types";

interface Props {
  open: boolean;
  handleClose: () => void;
  post: IPost;
}

const PostTotalDialog: FC<Props> = ({ open, handleClose, post }) => {
  const deliversQuery = usePostDelivers(post._id);
  return (
    <Dialog {...{ open, handleClose, title: getPostTitle(post) }}>
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
