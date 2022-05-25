import React, { FC, useRef } from "react";

import { PhotographIcon } from "@heroicons/react/outline";
import { nanoid } from "nanoid";

import Button from "components/Button";
import { createProfilePic } from "domain/Post/services";

import { useUploadImage } from "../hooks";

interface Props {
  text: string;
  setImage: (image: string) => void;
}

const UploadImage: FC<Props> = ({ text, setImage }) => {
  const uploadImage = useUploadImage();
  const pictureUploadRef = useRef<HTMLInputElement>(null);
  const openRef = () => pictureUploadRef.current?.click();
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    for (let i = 0; i < e.target.files.length; i++) {
      const image = e.target.files[i];
      const thumbnail = await createProfilePic(image);
      const id = nanoid();
      const filename = `user/${id}`;
      uploadImage.mutate(
        { filename, image: thumbnail, imageType: "profile" },
        {
          onSuccess: (imageUrl) => {
            setImage(imageUrl);
            e.target.value = "";
          },
        }
      );
    }
  };
  return (
    <>
      <Button
        // loading={uploading}
        className="mt-2"
        fullWidth
        onClick={() => openRef()}
        icon={<PhotographIcon />}
      >
        {text}
      </Button>

      <input
        id="images"
        className="hidden"
        type="file"
        onChange={handleChange}
        accept="image/*"
        ref={pictureUploadRef}
      />
    </>
  );
};

export default UploadImage;
