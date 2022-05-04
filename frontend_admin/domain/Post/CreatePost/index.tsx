/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { shallowPush } from "utils";

import Dialog from "components/Dialog";

import PostForm from "../PostForm";
// import { useCreatePost, useIfCreatedPostToday } from "../hooks";
import { PostFormSchema, postSchema } from "../schema";

const CreatePost = () => {
  const router = useRouter();
  // const createPost = useCreatePost();
  // const createdPostQuery = useIfCreatedPostToday();
  const [submitting, setSubmitting] = useState(false);
  const postForm = useForm<PostFormSchema>({
    defaultValues: postSchema.getDefault(),
    resolver: yupResolver(postSchema),
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    const { createPost, ...query } = router.query;
    shallowPush(router, query);
  };

  const onSubmit: SubmitHandler<PostFormSchema> = (data) => {
    console.log(data);
    setSubmitting(true);
    // if (createdPostQuery.data) {
    //   return toast.error("您今日已開過單，請明天再試！");
    // }
    // setSubmitting(true);
    // toast.loading("貼文製作中...", { id: "createPost" });
    // createPost.mutate(data, {
    //   onSuccess: () => {
    //     postForm.reset({
    //       ...postSchema.getDefault(),
    //       items: [{ item: "", price: undefined, itemQty: 100 }],
    //     });
    //     handleClose();
    //   },
    //   onSettled: () => {
    //     setSubmitting(false);
    //   },
    // });
  };

  useEffect(() => {
    if (router.query.createPost === "open") setOpen(true);
    else setOpen(false);
  }, [router.query.createPost]);

  useEffect(() => {
    // if (open) createdPostQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return open ? (
    <Dialog open={open} handleClose={() => handleClose()} title="新增貼文">
      <PostForm action="create" {...{ postForm, onSubmit, submitting }} />
    </Dialog>
  ) : null;
};

export default CreatePost;
