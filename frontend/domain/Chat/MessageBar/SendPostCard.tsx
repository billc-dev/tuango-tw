import router from "next/router";
import React, { FC } from "react";

import { PaperAirplaneIcon } from "@heroicons/react/outline";
import toast from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Button from "components/Button";
import Card from "components/Card";
import { IPostCard } from "domain/Post/types";
import { getFullDateFromNow } from "services/date";
import { shallowPush } from "utils/routing";

import { useSendMessage } from "../hooks";

interface Props {
  post: IPostCard;
}

const SendPostCard: FC<Props> = ({ post }) => {
  const sendMessage = useSendMessage();
  return (
    <Card
      className="shadow mx-2 my-3 cursor-pointer hover:shadow-lg transition-shadow bg-white ring-1 ring-zinc-200 dark:ring-0"
      onClick={() => shallowPush(router, { ...router.query, postId: post._id })}
    >
      <div className="grid grid-cols-4">
        <div className="my-auto item col-span-1 max-h-28">
          <LazyLoadImage
            className="h-full w-full object-cover"
            src={post.imageUrls && post.imageUrls[0].sm}
          />
        </div>
        <div className="p-2 col-span-3">
          <p className="text-sm">
            #{post.postNum} {post.title} #{post.displayName}
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {getFullDateFromNow(post.createdAt)}
          </p>
          <div
            className="pt-2 flex justify-end items-end"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              loading={sendMessage.isLoading}
              size="lg"
              icon={<PaperAirplaneIcon className="rotate-90" />}
              variant="primary"
              onClick={() => {
                const { roomId } = router.query;
                if (typeof roomId !== "string") return;
                sendMessage.mutate(
                  { type: "post", payload: post._id, roomId },
                  {
                    onSuccess: () => {
                      const { send_post, ...query } = router.query;
                      shallowPush(router, query);
                    },
                    onError: () => {
                      toast.error("貼文傳送失敗");
                    },
                  }
                );
              }}
            >
              傳送
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SendPostCard;
