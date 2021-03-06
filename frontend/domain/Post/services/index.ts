import { NextRouter } from "next/router";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

import axios from "axios";
import { nanoid } from "nanoid";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import Resizer from "react-image-file-resizer";
import { QueryClient } from "react-query";

import { PostFormSchema } from "../schema";
import {
  Action,
  IPost,
  ImageUrl,
  InfinitePostsQueryData,
  Item,
  PostStorageType,
} from "../types";

export function getProductPriceRange(items: Item[]) {
  let price;

  if (items.length > 1) {
    const min = items.reduce(
      (min, item) => Math.min(min, item.price),
      items[0].price
    );
    const max = items.reduce(
      (min, item) => Math.max(min, item.price),
      items[0].price
    );
    if (min === max) price = items[0].price;
    else price = `${min}~$${max}`;
  } else price = items[0].price;

  return price;
}

export const setAction = (action: Action, router: NextRouter) => {
  router.push({ query: { ...router.query, action } }, undefined, {
    shallow: true,
  });
};

type ImageType = "sm" | "md";
type ImagePromises = Promise<void | {
  index: number;
  type: ImageType;
  url: string;
}>;
const postImageAWS = (
  promises: ImagePromises[],
  image: unknown,
  index: number,
  type: ImageType,
  filename: string
) => {
  const promise = axios
    .put(
      `https://4tr9p3bu1e.execute-api.ap-east-1.amazonaws.com/prod/upload-image?bucket=tuango-tw-images&key=${filename}/${type}.jpeg`,
      image,
      { headers: { "Content-Type": "image/jpeg" }, withCredentials: false }
    )
    .then(() => {
      return {
        index,
        type,
        url: `https://d2lduww19xwizo.cloudfront.net/${filename}/${type}.jpeg`,
      };
    })
    .catch((err) => console.log(err));
  promises.push(promise);
};

const createThumbnail = (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      50,
      0,
      (uri) => resolve(uri),
      "file"
    );
  });

const resizeImage = (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1500,
      1500,
      "JPEG",
      50,
      0,
      (uri) => resolve(uri),
      "file"
    );
  });

export const uploadImageS3 = async (
  e: ChangeEvent<HTMLInputElement>,
  setUploading: Dispatch<SetStateAction<boolean>>,
  getValues: UseFormGetValues<PostFormSchema>,
  setValue: UseFormSetValue<PostFormSchema>,
  userId: string
) => {
  if (!e.target.files) return;
  setUploading(true);
  let promises: ImagePromises[] = [];
  for (let i = 0; i < e.target.files.length; i++) {
    const image = e.target.files[i];
    const thumbnail = await createThumbnail(image);
    const resizedImage = await resizeImage(image);
    const id = nanoid();
    const filename = `post/${userId}/${id}`;
    postImageAWS(promises, thumbnail, i, "sm", filename);
    postImageAWS(promises, resizedImage, i, "md", filename);
  }
  try {
    const imageUrls: ImageUrl[] = [];
    const images = await Promise.all(promises);
    images.forEach((image) => {
      if (!image) return;
      if (imageUrls.length === image.index) {
        imageUrls.push({ sm: image.url, md: "", lg: "" });
      } else {
        imageUrls[image.index].md = image.url;
        imageUrls[image.index].lg = image.url;
      }
    });
    const formImages = getValues("imageUrls");
    setValue("imageUrls", [...formImages, ...imageUrls]);
  } catch (err) {
    console.log(err);
  } finally {
    setUploading(false);
    e.target.value = "";
  }
};

export const getPostUrl = (postId: string) => {
  return `www.????????????.com/posts?postId=${postId}`;
};

export const updateInfinitePostsQueryData = (
  queryClient: QueryClient,
  post: IPost
) => {
  const postsQuery = queryClient.getQueryData<InfinitePostsQueryData>([
    "posts",
    20,
  ]);
  if (!postsQuery) return;

  const updatedPosts: InfinitePostsQueryData = {
    ...postsQuery,
    pages: postsQuery.pages.map((page) => ({
      ...page,
      posts: page.posts.map((p) => {
        if (p._id !== post._id) return p;
        return post;
      }),
    })),
  };

  if (!updatedPosts) return;
  queryClient.setQueryData<InfinitePostsQueryData>(["posts", 20], updatedPosts);
};

export const getStorageTypeLabel = (storageType: PostStorageType) => {
  switch (storageType) {
    case "roomTemp":
      return "??????";
    case "farmGoods":
      return "?????????";
    case "refrigerated":
      return "??????";
    case "frozen":
      return "??????";
    default:
      return "";
  }
};

export const getFullTitle = (post?: IPost) => {
  if (!post) return "";
  return `#${post.postNum} ${post.title} #${post.displayName}`;
};

export const storageTypeOptions = [
  { label: "??????", value: "roomTemp" },
  { label: "?????????", value: "farmGoods" },
  { label: "?????? ??????", value: "refrigerated" },
  { label: "?????? ????", value: "frozen" },
];
