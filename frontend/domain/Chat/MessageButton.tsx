import { useRouter } from "next/router";
import React, { FC, useState } from "react";

import { ChatIcon } from "@heroicons/react/solid";
import { useQueryClient } from "react-query";

import Button from "components/Button";
import { IOrder } from "domain/Order/types";
import { IPost } from "domain/Post/types";
import { useUser, useUserId } from "domain/User/hooks";
import { shallowPush } from "utils/routing";

interface Props {
  post?: IPost;
  order?: IOrder;
  username: string;
}

const MessageButton: FC<Props> = ({ post, order, username }) => {
  const queryClient = useQueryClient();
  const userQuery = useUser();
  const router = useRouter();
  const userId = useUserId();
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    if (!post && !order) return;
    setLoading(true);
    if (post) {
      userId.mutate(username, {
        onSuccess: ({ data: { userId } }) => {
          shallowPush(router, { ...router.query, chatId: userId });
          if (!userQuery.data?.data.user._id) return;
          queryClient.setQueryData("unsentMessage", [
            {
              _id: new Date().toISOString(),
              userId: userQuery.data.data.user._id,
              type: "post",
              post,
              read: [],
            },
          ]);
        },
        onSettled: () => setLoading(false),
      });
    }
  };
  return (
    <Button
      loading={loading}
      className="px-1.5"
      icon={<ChatIcon />}
      variant="primary"
      onClick={() => handleClick()}
    >
      <p className="whitespace-nowrap">私訊</p>
    </Button>
  );
};

export default MessageButton;
