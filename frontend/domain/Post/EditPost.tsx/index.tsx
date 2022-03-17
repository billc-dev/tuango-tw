import React, { Dispatch, FC, SetStateAction, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Dialog from "components/Dialog";

import PostForm from "../PostForm";
import { useEditPost } from "../hooks";
import { PostFormSchema, postSchema } from "../schema";
import { IPost } from "../types";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  post: IPost;
}

const EditPost: FC<Props> = ({ open, setOpen, post }) => {
  const [submitting, setSubmitting] = useState(false);
  const { title, storageType, deadline, deliveryDate } = post;
  const { body, items, imageUrls } = post;
  const editPost = useEditPost();
  const postForm = useForm<PostFormSchema>({
    defaultValues: {
      title,
      storageType,
      deadline,
      deliveryDate,
      body,
      items,
      imageUrls,
    },
    resolver: yupResolver(postSchema),
  });
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit: SubmitHandler<PostFormSchema> = (data) => {
    setSubmitting(true);
    toast.loading("貼文編輯中...", { id: "editPost" });
    editPost.mutate(
      { postId: post._id, postForm: data },
      {
        onSuccess: (data) => {
          postForm.reset({ ...data.data.post });
          setOpen(false);
        },
        onSettled: () => {
          setSubmitting(false);
        },
      }
    );
  };

  return (
    <Dialog {...{ open, handleClose, title: "編輯貼文" }}>
      <PostForm action="edit" {...{ postForm, onSubmit, submitting }} />
    </Dialog>
  );
};

export default EditPost;
