/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { shallowPush } from "utils";

import CardHeader from "components/Card/CardHeader";
import Checkbox from "components/Checkbox";
import Dialog from "components/Dialog";
import TextField from "components/TextField";
import UserQuery from "domain/User/UserQuery";
import { User } from "domain/User/types";

import PostForm from "../PostForm";
import { useCheckDuplicatePostNum, useCreatePost } from "../hooks";
import { PostFormSchema, postSchema } from "../schema";

const CreatePost = () => {
  const router = useRouter();
  const createPost = useCreatePost();
  const [user, setUser] = useState<User>();
  const [fb, setFB] = useState(false);
  const [postNum, setPostNum] = useState<number>();
  const [postNumError, setPostNumError] = useState("");
  const duplicatePostNumQuery = useCheckDuplicatePostNum(postNum);
  const postForm = useForm<PostFormSchema>({
    defaultValues: postSchema.getDefault(),
    resolver: yupResolver(postSchema),
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    const { createPost, ...query } = router.query;
    shallowPush(router, query);
  };

  const onSubmit: SubmitHandler<PostFormSchema> = async (data) => {
    if (!user) return toast.error("請選擇開單者！");
    if (postNum && postNum > 0) {
      await duplicatePostNumQuery.refetch();
      if (duplicatePostNumQuery.data) {
        setPostNumError("流水編號重複了!");
        return toast.error("流水編號重複了!");
      }
    }

    toast.loading("貼文製作中...", { id: "createPost" });
    createPost.mutate(
      { postForm: data, postNum, user, fb },
      { onSuccess: () => handleClose() }
    );
  };
  const handleSetUser = (user: User) => {
    setUser(user);
  };

  useEffect(() => {
    if (router.query.createPost === "open") setOpen(true);
    else setOpen(false);
  }, [router.query.createPost]);

  useEffect(() => {
    if (!duplicatePostNumQuery.data) setPostNumError("");
  }, [duplicatePostNumQuery.data]);
  return open ? (
    <Dialog
      open={open}
      handleClose={() => handleClose()}
      title={`新增${fb ? "FB" : "開心團購"}貼文`}
    >
      <div className="mt-2">
        <UserQuery
          isSeller
          fullWidth
          placeholder="開單者"
          setUser={handleSetUser}
          color="grey"
        />
      </div>
      {user && (
        <>
          <CardHeader img={user.pictureUrl} title={user.displayName} />
          <div className="mb-2 flex items-center">
            <Checkbox checked={fb} onChange={(e) => setFB(e.target.checked)} />
            <p className="ml-2">FB</p>
          </div>
          <TextField
            type="number"
            color="grey"
            placeholder="流水編號"
            value={postNum}
            onChange={(e) => setPostNum(Number(e.target.value))}
            error={
              duplicatePostNumQuery.data
                ? "流水編號重複了!"
                : undefined || postNumError
            }
          />
          <PostForm
            action="create"
            {...{ postForm, onSubmit, submitting: createPost.isLoading }}
          />
        </>
      )}
    </Dialog>
  ) : null;
};

export default CreatePost;
