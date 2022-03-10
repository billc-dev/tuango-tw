/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";

import {
  DocumentAddIcon,
  PhotographIcon,
  PlusIcon,
  RefreshIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import Button from "components/Button";
import Dialog from "components/Dialog";
import TextField from "components/TextField";
import TextArea from "components/TextField/TextArea";
import { useUser } from "domain/User/hooks";
import { indexAlphabet } from "utils/constants";

import { PostForm, postSchema } from "../schema";
import { uploadImageS3 } from "../services";

const CreatePost = () => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [agree, setAgree] = useState(false);
  const { createPost } = router.query;
  const userQuery = useUser();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm<PostForm>({
    defaultValues: postSchema.getDefault(),
    resolver: yupResolver(postSchema),
  });
  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const imageUrlsFieldArray = useFieldArray({ control, name: "imageUrls" });
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    router.push({ query: { ...router.query, createPost: "" } }, undefined, {
      shallow: true,
    });
  };
  const pictureUploadRef = useRef<HTMLInputElement>(null);
  const openRef = () => pictureUploadRef.current?.click();
  const imageUrls = getValues("imageUrls");
  console.log(errors);

  const onSubmit: SubmitHandler<PostForm> = (data) => console.log("form", data);
  useEffect(() => {
    if (createPost === "open") setOpen(true);
    else setOpen(false);
  }, [createPost]);
  return open ? (
    <Dialog open={open} handleClose={() => handleClose()} title="新增貼文">
      <div className="pt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            color="grey"
            placeholder="團購主題"
            error={errors.title?.message}
            {...register("title")}
          />
          <p className="text-sm pb-2">👉 流水編號和團主名稱不用寫</p>
          <select
            className="rounded-lg w-full bg-zinc-100 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-600 mb-2"
            {...register("storageType")}
          >
            <option value="roomTemp">常溫</option>
            <option value="refrigerated">冷藏</option>
            <option value="frozen">冷凍</option>
          </select>
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
          {fields.map((item, index) => (
            <div key={item.id}>
              <TextField
                label={`${indexAlphabet[index]}.`}
                color="grey"
                placeholder="商品名稱"
                error={errors.items?.[index]?.item?.message}
                key={`items.${index}.item`}
                {...register(`items.${index}.item`)}
              />
              <TextField
                color="grey"
                placeholder="價格"
                key={`items.${index}.price`}
                error={errors.items?.[index]?.price?.message}
                {...register(`items.${index}.price`)}
              />
              <TextField
                color="grey"
                placeholder="數量"
                key={`items.${index}.itemQty`}
                error={errors.items?.[index]?.itemQty?.message}
                {...register(`items.${index}.itemQty`)}
              />
              {index !== 0 && (
                <Button icon={<TrashIcon />} onClick={() => remove(index)}>
                  刪除
                </Button>
              )}
            </div>
          ))}
          <Button
            className="mt-2"
            fullWidth
            icon={<PlusIcon />}
            onClick={() => append({ item: "", price: undefined, itemQty: 100 })}
          >
            新增商品
          </Button>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {imageUrls.map((image, index) => (
              <div className="flex flex-col justify-between" key={index}>
                <select
                  className="rounded-lg w-full bg-zinc-100 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-600 mb-2"
                  value={index}
                  onChange={(e) =>
                    imageUrlsFieldArray.swap(index, Number(e.target.value))
                  }
                >
                  {imageUrls.map((_, index) => (
                    <option key={index} value={index}>
                      {index + 1}
                    </option>
                  ))}
                </select>
                <img src={image.md} alt="product" />
                <Button
                  className="mt-2"
                  fullWidth
                  icon={<TrashIcon />}
                  onClick={() => imageUrlsFieldArray.remove(index)}
                >
                  刪除
                </Button>
              </div>
            ))}
          </div>
          <Button
            loading={uploading}
            className="mt-2"
            fullWidth
            onClick={() => openRef()}
            icon={<PhotographIcon />}
          >
            新增照片
          </Button>
          {errors.imageUrls && imageUrls.length === 0 && (
            <p className="text-red-600 text-center mt-1 text-sm">請上傳圖片!</p>
          )}
          <input
            id="images"
            className="hidden"
            type="file"
            multiple
            onChange={(e) =>
              uploadImageS3(
                e,
                setUploading,
                getValues,
                setValue,
                userQuery.data?.data.user.username!
              )
            }
            accept="image/*"
            ref={pictureUploadRef}
          />
          <p className="pt-2">開單注意事項:</p>
          <p className="text-sm">⚠️ 結單前，團員有權利取消訂單</p>
          <div className="flex items-center ml-2">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="rounded cursor-pointer transition text-line-600 focus:ring-line-600 ring-line-600 border-zinc-200 dark:border-zinc-600"
            />
            <p
              className="ml-2 text-sm cursor-pointer select-none"
              onClick={() => setAgree(!agree)}
            >
              我已閱讀並同意開單注意事項
            </p>
          </div>
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
