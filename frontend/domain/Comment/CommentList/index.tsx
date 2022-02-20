import React, { FC } from "react";
import { useGetComments } from "../hooks";
import Comment from "./Comment";
interface Props {
  postId: string;
}

const CommentList: FC<Props> = ({ postId }) => {
  const { data } = useGetComments(postId);
  return (
    <>
      {data?.data.comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </>
  );
};

export default CommentList;
