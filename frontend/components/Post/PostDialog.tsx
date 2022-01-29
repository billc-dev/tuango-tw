import { fetchPost } from "api/posts";
import Dialog from "components/Core/Dialog";
import { route } from "next/dist/server/router";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import PostContent from "./PostContent";

interface Props {
  id: string;
}

const PostDialog: FC<Props> = (props) => {
  const router = useRouter();
  const { id } = props;
  const [open, setOpen] = useState(false);
  const { data } = useQuery(["post", id], () => fetchPost(id as string), {
    staleTime: 1000 * 60,
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
    </Dialog>
  ) : null;
};

export default PostDialog;
