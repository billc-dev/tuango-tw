import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";

import { PaperAirplaneIcon } from "@heroicons/react/outline";
import toast from "react-hot-toast";

import Button from "components/Button";
import Card from "components/Card";
import { useSendMessage } from "domain/Chat/hooks";
import { getFullDateFromNow } from "services/date";
import { shallowPush } from "utils/routing";

import { IOrder } from "../types";

interface Props {
  order: IOrder;
  type?: "sendMessage";
  chat?: boolean;
}

const NormalOrderCard: FC<Props> = ({ order, type, chat }) => {
  const [loaded, setLoaded] = useState(false);
  const sendMessage = useSendMessage();
  const sum = order.order.reduce((sum, ord) => (sum += ord.price * ord.qty), 0);
  const router = useRouter();
  const handleClick = () => {
    if (chat) {
      shallowPush(router, {
        ...router.query,
        chatPostId: order.postId,
        action: "order",
      });
    } else {
      shallowPush(router, {
        ...router.query,
        postId: order.postId,
        action: "order",
      });
    }
  };
  return (
    <Card
      className="shadow mx-2 my-3 cursor-pointer hover:shadow-lg transition-shadow bg-white ring-1 ring-zinc-200 dark:ring-0"
      onClick={() => handleClick()}
    >
      <div className="grid grid-cols-4">
        <div className="my-auto item col-span-1 relative w-full h-full">
          {/* <LazyLoadImage
            className="h-full w-full object-cover"
            src={order.imageUrl}
          /> */}
          {order.imageUrl.includes("ibb.co") ? null : (
            <Image
              alt="product"
              src={order.imageUrl}
              layout="fill"
              objectFit="contain"
              className={` transition-all duration-300 ${
                loaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
              }`}
              onLoadingComplete={() => setLoaded(true)}
            />
          )}
        </div>
        <div className="p-2 col-span-3">
          <p className="text-sm">
            #{order.postNum} {order.title} #{order.sellerDisplayName}
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {getFullDateFromNow(
              order.deliveredAt ? order.deliveredAt : order.createdAt
            )}
          </p>
          <div className="text-sm border-zinc-400 border-b-[1px] pb-1">
            {order.order.map((order, index) => (
              <p key={order.id + index}>
                {`${order.id}. ${order.item}+${order.qty} $${
                  order.price * order.qty
                }`}
              </p>
            ))}
          </div>
          <p className="text-sm">
            {"合計$"}
            {sum}
          </p>
        </div>
      </div>
      {type === "sendMessage" && (
        <div
          className="p-2 pt-0 flex justify-end items-center"
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
                { type: "order", payload: order._id, roomId },
                {
                  onSuccess: () => {
                    const { send_order, ...query } = router.query;
                    shallowPush(router, query);
                  },
                  onError: () => {
                    toast.error("訂單傳送失敗");
                  },
                }
              );
            }}
          >
            傳送
          </Button>
        </div>
      )}
    </Card>
  );
};

export default NormalOrderCard;
