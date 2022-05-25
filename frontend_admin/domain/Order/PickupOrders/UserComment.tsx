import React, { FC, useEffect, useState } from "react";

import Button from "components/Button";
import TextField from "components/TextField";
import { usePatchUserComment, useUserComment } from "domain/User/hooks";

interface Props {
  username: string;
}

const UserComment: FC<Props> = ({ username }) => {
  const userCommentQuery = useUserComment(username);
  const patchUserComment = usePatchUserComment();
  const [comment, setComment] = useState<string>();
  const handleSubmit = () => {
    if (typeof comment !== "string") return;
    patchUserComment.mutate({ username, comment });
  };

  useEffect(() => {
    if (typeof userCommentQuery.data !== "string") return;
    setComment(userCommentQuery.data);
  }, [userCommentQuery.data]);
  return (
    <div className="mt-4">
      <TextField
        value={comment}
        color="grey"
        placeholder="備註"
        noLabel
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        loading={patchUserComment.isLoading}
        fullWidth
        onClick={handleSubmit}
      >
        儲存備註
      </Button>
    </div>
  );
};

export default UserComment;
