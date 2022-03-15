/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Dialog from "components/Dialog";

import PostForm from "../PostForm";
import LoadPreviousPosts from "../PostSellerActions/LoadPreviousPosts";
import { useCreatePost } from "../hooks";
import { PostFormSchema, postSchema } from "../schema";

const CreatePost = () => {
  const router = useRouter();
  const postForm = useForm<PostFormSchema>({
    defaultValues: postSchema.getDefault(),
    resolver: yupResolver(postSchema),
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    router.push({ query: { ...router.query, createPost: "" } }, undefined, {
      shallow: true,
    });
  };
  const createPost = useCreatePost();

  const onSubmit: SubmitHandler<PostFormSchema> = (data) => {
    toast.loading("貼文製作中...", { id: "createPost" });
    createPost.mutate(data, {
      onSuccess: () => {
        postForm.reset({
          ...postSchema.getDefault(),
          items: [{ item: "", price: 0, itemQty: 100 }],
        });
        handleClose();
      },
    });
  };

  useEffect(() => {
    if (router.query.createPost === "open") setOpen(true);
    else setOpen(false);
  }, [router.query.createPost]);

  return open ? (
    <Dialog open={open} handleClose={() => handleClose()} title="新增貼文">
      <div className="pt-4">
        <LoadPreviousPosts reset={postForm.reset} />
        <PostForm action="create" {...{ postForm, onSubmit }} />
      </div>
    </Dialog>
  ) : null;
};

export default CreatePost;
