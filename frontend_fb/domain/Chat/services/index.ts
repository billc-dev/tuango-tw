import { UseMutationResult } from "react-query";

import { resizeImage } from "services/image";

import { UploadImageParams } from "../api";

export const resizeImages = async (image: File) => {
  const smImage = await resizeImage(image, "sm");
  const mdImage = await resizeImage(image, "md");
  return { smImage, mdImage };
};

interface UploadImagesParams {
  uploadImage: UseMutationResult<string, unknown, UploadImageParams, unknown>;
  smImage: unknown;
  mdImage: unknown;
  filename: string;
}

export const uploadImages = async (params: UploadImagesParams) => {
  const { uploadImage, smImage, mdImage, filename } = params;
  const sm = await uploadImage.mutateAsync({
    image: smImage,
    filename,
    type: "sm",
  });
  const md = await uploadImage.mutateAsync({
    image: mdImage,
    filename,
    type: "md",
  });
  return { sm, md };
};
