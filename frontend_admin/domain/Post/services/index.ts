import { IOrder } from "domain/Order/types";

import { IPost, PostStatus, PostStorageType } from "../types";

export * from "./image";

export const getStorageType = (storageType: PostStorageType) => {
  switch (storageType) {
    case "roomTemp":
      return "常溫";
    case "refrigerated":
      return "冷藏 ❄️";
    case "frozen":
      return "冷凍 🧊";
    default:
      return "";
  }
};

export const getStatus = (status: PostStatus) => {
  switch (status) {
    case "open":
      return "未結單";
    case "closed":
      return "已結單";
    case "completed":
      return "已完成";
    case "canceled":
      return "已取消";
    default:
      return "";
  }
};

export const getPostTitle = (post?: IPost | IOrder) => {
  if (post) {
    const { postNum, title, displayName } = post;
    return `#${postNum} ${title} ~${displayName}`;
  }
  return "";
};
