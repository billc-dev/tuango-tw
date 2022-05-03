import { useRouter } from "next/router";
import React, { FC } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { shallowPush } from "utils";

import PostForm from "../PostForm";
import { useEditPost } from "../hooks";
import { PostFormSchema, postSchema } from "../schema";
import { IPost } from "../types";

interface Props {
  post: IPost;
}

const EditPostForm: FC<Props> = ({ post }) => {
  const editPost = useEditPost();
  const router = useRouter();
  const { title, storageType, deadline, deliveryDate } = post;
  const { body, items, imageUrls } = post;
  const onSubmit: SubmitHandler<PostFormSchema> = (data) => {
    editPost.mutate(
      { postId: post._id, postForm: data },
      {
        onSuccess: (data) => {
          // postForm.reset({ ...data.data.post });
          const { edit_post_id, ...query } = router.query;
          shallowPush(router, query);
        },
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
