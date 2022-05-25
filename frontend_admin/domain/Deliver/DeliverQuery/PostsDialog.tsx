import React, { FC } from "react";

import Button from "components/Button";
import PopupDialog from "components/Dialog/PopupDialog";
import { useDatePosts } from "domain/Post/hooks";
import { getPostTitle } from "domain/Post/services";

interface Props {
  open: boolean;
  handleClose: () => void;
  date: string;
  setPostNum: React.Dispatch<React.SetStateAction<string>>;
}

const PostsDialog: FC<Props> = ({ open, handleClose, date, setPostNum }) => {
  const postsQuery = useDatePosts(date);
  return (
    <>
      <PopupDialog title={date} {...{ open, handleClose }}>
        {postsQuery.data?.map((post) => (
          <Button
            className="my-2"
            key={post._id}
            fullWidth
            onClick={() => {
              setPostNum(post.postNum.toString());
              handleClose();
            }}
          >
            {getPostTitle(post)}
          </Button>
        ))}
      </PopupDialog>
    </>
  );
};

export default PostsDialog;
