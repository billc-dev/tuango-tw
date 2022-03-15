/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

import { DocumentAddIcon, RefreshIcon } from "@heroicons/react/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Button from "components/Button";
import Dialog from "components/Dialog";
import TextField from "components/TextField";
import TextArea from "components/TextField/TextArea";

import Agree from "../PostSellerActions/Agree";
import ImageGrid from "../PostSellerActions/ImageGrid";
import LoadPreviousPosts from "../PostSellerActions/LoadPreviousPosts";
import PostItems from "../PostSellerActions/PostItems";
import StorageTypeSelect from "../PostSellerActions/StorageTypeSelect";
import UploadImageButton from "../PostSellerActions/UploadImageButton";
import { useCreatePost } from "../hooks";
import { PostForm, postSchema } from "../schema";

const CreatePost = () => {
  const router = useRouter();
  const [agree, setAgree] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    getValues,
    formState: { errors },
    reset,
  } = useForm<PostForm>({
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

  const onSubmit: SubmitHandler<PostForm> = (data) => {
    toast.loading("貼文製作中...", { id: "createPost" });
    createPost.mutate(data, {
      onSuccess: () => {
        reset({
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
        <LoadPreviousPosts {...{ reset }} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            color="grey"
            placeholder="團購主題"
            error={errors.title?.message}
            {...register("title")}
          />
          <p className="text-sm pb-2">👉 流水編號和團主名稱不用寫</p>
          <StorageTypeSelect {...{ register }} />
          <TextField
            color="grey"
            type="date"
            placeholder="結單日"
            error={errors.deadline?.message}
            {...register("deadline")}
          />
          <Button
            icon={<RefreshIcon />}
            className="mb-2"
            onClick={() => setValue("deadline", "")}
          >
            重置結單日
          </Button>
          <TextField
            color="grey"
            type="date"
            error={errors.deliveryDate?.message}
            {...register("deliveryDate")}
          />
          <Button
            icon={<RefreshIcon />}
            className="mb-2"
            onClick={() => setValue("deliveryDate", "")}
          >
            重置到貨日
          </Button>
          <TextArea
            minRows={8}
            color="grey"
            placeholder="團購內容"
            error={errors.body?.message}
            {...register("body")}
          />
          <PostItems {...{ control, errors, register }} />
          <ImageGrid {...{ getValues, control }} />
          <UploadImageButton {...{ getValues, setValue, errors }} />
          <Agree {...{ agree, setAgree }} />
          <Button
            icon={<DocumentAddIcon />}
            disabled={!agree}
            type="submit"
            variant="primary"
            fullWidth
            className="mt-4"
            size="lg"
          >
            新增貼文
          </Button>
        </form>
      </div>
    </Dialog>
  ) : null;
};

export default CreatePost;
