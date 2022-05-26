import { useRouter } from "next/router";
import React, { ChangeEvent, FC, useRef, useState } from "react";

import {
  ClipboardListIcon,
  CollectionIcon,
  PhotographIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";

import IconButton from "components/Button/IconButton";
import Menu, { MenuItem } from "components/Menu";
import { useUser } from "domain/User/hooks";
import { shallowPush } from "utils/routing";

import { useSendMessage, useUploadImage } from "../hooks";
import { resizeImages, uploadImages } from "../services";

interface Props {
  roomId: string;
}

const MessageActions: FC<Props> = ({ roomId }) => {
  const router = useRouter();
  const userQuery = useUser();
  const sendMessage = useSendMessage();
  const [open, setOpen] = useState(false);
  const uploadImage = useUploadImage();
  const imageRef = useRef<HTMLInputElement>(null);
  const items: MenuItem[] = [
    {
      icon: <PhotographIcon />,
      text: "傳送圖片",
      onClick: () => {
        imageRef.current?.click();
        setOpen(false);
      },
    },
    {
      icon: <ClipboardListIcon />,
      text: "傳送訂單",
      onClick: () => {
        shallowPush(router, { ...router.query, send_order: "open" });
        setOpen(false);
      },
    },
    {
      icon: <CollectionIcon />,
      text: "傳送貼文",
      onClick: () => {
        shallowPush(router, { ...router.query, send_post: "open" });
        setOpen(false);
      },
    },
  ];
  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const userId = userQuery.data?.data.user._id;
    if (!userId) return;
    if (!e.target.files) return;
    try {
      for (let i = 0; i < e.target.files.length; i++) {
        const { smImage, mdImage } = await resizeImages(e.target.files[i]);
        const id = nanoid();
        const filename = `chat/${userId}/${id}`;
        const { sm, md } = await uploadImages({
          uploadImage,
          smImage,
          mdImage,
          filename,
        });
        await sendMessage.mutateAsync({
          type: "imageUrl",
          payload: { sm, md, lg: md },
          roomId,
        });
      }
    } catch (error) {
      toast.error("圖片上傳失敗");
    } finally {
      e.target.value = "";
    }
  };
  return (
    <div className="relative">
      <IconButton onClick={() => setOpen(true)}>
        <PlusIcon className="text-zinc-700" />
      </IconButton>
      <Menu open={open} handleClose={() => setOpen(false)} items={items} />
      <input
        ref={imageRef}
        type="file"
        multiple
        onChange={handleUploadImage}
        accept="image/*"
        style={{ display: "none" }}
      />
    </div>
  );
};

export default MessageActions;
