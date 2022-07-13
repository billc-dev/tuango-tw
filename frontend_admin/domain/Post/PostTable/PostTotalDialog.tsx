import React, { FC } from "react";

import Dialog from "components/Dialog";
import DeliverTable from "domain/Deliver/EditDeliverTable";
import { usePostDelivers } from "domain/Deliver/hooks";

interface Props {
  open: boolean;
  handleClose: () => void;
  postId: string;
  postTitle: string;
}

const PostTotalDialog: FC<Props> = ({
  open,
  handleClose,
  postId,
  postTitle,
}) => {
  const deliversQuery = usePostDelivers(postId);
  return (
    <Dialog {...{ open, handleClose, title: postTitle }}>
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
