import { fetchPost } from "domain/Post/api/post";
import Dialog from "components/Dialog";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import PostActions from "./components/PostActions";
import PostContent from "./components/PostContent";

interface Props {
  id: string;
}

const PostDialog: FC<Props> = (props) => {
  const router = useRouter();
  const { id } = props;
  const [open, setOpen] = useState(false);
  const { data } = useQuery(["post", id], () => fetchPost(id as string), {
    staleTime: 1000 * 10,
  });

  const handleClose = () => {
    router.push({ query: {} }, undefined, { shallow: true });
  };

  useEffect(() => {
    if (id) setOpen(true);
    else setOpen(false);
  }, [id]);

  return data?.post ? (
    <Dialog
      open={open}
      handleClose={() => handleClose()}
      title={data.post.title}
    >
      <PostContent post={data.post} />
      <PostActions post={data.post} />
    </Dialog>
  ) : null;
};

export default PostDialog;
