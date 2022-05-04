import React, { FC, useState } from "react";

import { DocumentAddIcon, RefreshIcon } from "@heroicons/react/outline";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

import Button from "components/Button";
import TextField from "components/TextField";
import TextArea from "components/TextField/TextArea";

import Agree from "../PostSellerActions/Agree";
import ImageGrid from "../PostSellerActions/ImageGrid";
import PostItems from "../PostSellerActions/PostItems";
import StorageTypeSelect from "../PostSellerActions/StorageTypeSelect";
import UploadImageButton from "../PostSellerActions/UploadImageButton";
import { PostFormSchema } from "../schema";

interface Props {
  postForm: UseFormReturn<PostFormSchema, any>;
  onSubmit: SubmitHandler<PostFormSchema>;
  action: "create" | "edit";
  submitting: boolean;
  noOrders?: boolean;
}

const PostForm: FC<Props> = (props) => {
  const { postForm, onSubmit, action, submitting, noOrders } = props;
  const [agree, setAgree] = useState(action === "edit");
  const {
    handleSubmit,
    register,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = postForm;
  return (
    <form id="post-form" onSubmit={handleSubmit(onSubmit)} className="mt-2">
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
        placeholder="到貨日"
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
      <PostItems {...{ control, errors, register, noOrders }} />
      <ImageGrid {...{ getValues, control }} />
      <UploadImageButton {...{ getValues, setValue, errors }} />
      {action === "create" && <Agree {...{ agree, setAgree }} />}
      <Button
        loading={submitting}
        icon={<DocumentAddIcon />}
        disabled={!agree}
        type="submit"
        variant="primary"
        fullWidth
        className="mt-4"
        size="lg"
      >
        {action === "create" ? "新增貼文" : "編輯貼文"}
      </Button>
    </form>
  );
};

export default PostForm;
