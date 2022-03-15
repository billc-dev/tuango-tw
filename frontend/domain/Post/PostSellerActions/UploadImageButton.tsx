import React, { FC, useRef, useState } from "react";

import { PhotographIcon } from "@heroicons/react/outline";
import { FormState, UseFormGetValues, UseFormSetValue } from "react-hook-form";

import Button from "components/Button";
import { useUser } from "domain/User/hooks";

import { PostForm } from "../schema";
import { uploadImageS3 } from "../services";

interface Props {
  getValues: UseFormGetValues<PostForm>;
  setValue: UseFormSetValue<PostForm>;
  errors: FormState<PostForm>["errors"];
}

const UploadImageButton: FC<Props> = (props) => {
  const { getValues, setValue, errors } = props;
  const [uploading, setUploading] = useState(false);
  const userQuery = useUser();
  const pictureUploadRef = useRef<HTMLInputElement>(null);
  const openRef = () => pictureUploadRef.current?.click();
  const imageUrls = getValues("imageUrls");

  return (
    <>
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
    </>
  );
};

export default UploadImageButton;
