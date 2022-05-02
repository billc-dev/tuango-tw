import React, { FC } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import PostForm from "../PostForm";
import { useEditPost } from "../hooks";
import { PostFormSchema, postSchema } from "../schema";
import { IPost } from "../types";

interface Props {
  post: IPost;
}

const EditPostForm: FC<Props> = ({ post }) => {
  const editPost = useEditPost();
  const { title, storageType, deadline, deliveryDate } = post;
  const { body, items, imageUrls } = post;
  const onSubmit: SubmitHandler<PostFormSchema> = (data) => {
    toast.loading("貼文編輯中...", { id: "editPost" });
    editPost.mutate(
      { postId: post._id, postForm: data },
      {
        onSuccess: (data) => {
          postForm.reset({ ...data.data.post });
        },
        onSettled: () => {},
      }
    );
  };
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
  return (
    <PostForm
      action="edit"
      {...{
        postForm,
        onSubmit,
        submitting: editPost.isLoading,
      }}
    />
  );
};

export default EditPostForm;
