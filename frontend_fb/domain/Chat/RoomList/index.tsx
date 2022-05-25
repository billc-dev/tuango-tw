import { useRouter } from "next/router";
import React from "react";

import CardHeader from "components/Card/CardHeader";
import { useUser } from "domain/User/hooks";
import { shallowPush } from "utils/routing";

import { useRooms } from "../hooks";
import RoomListSkeleton from "./RoomListSkeleton";

const RoomList = () => {
  const router = useRouter();
  const userQuery = useUser();
  const roomQuery = useRooms();

  return (
    <div className="px-2 max-w-sm mx-auto">
      {roomQuery.data?.data.rooms.map((room) => {
        const otherUser = room.users.find((u) => {
          if (typeof u.user === "string") return false;
          return u.user._id !== userQuery.data?.data.user._id;
        });
        const user = room.users.find((u) => {
          if (typeof u.user === "string") return false;
          return u.user._id === userQuery.data?.data.user._id;
        });
        if (!otherUser || !user) return null;
        if (typeof otherUser.user === "string") return null;
        return (
          <div
            key={room._id}
            className="px-4 active:bg-zinc-200 dark:active:bg-zinc-700"
            onClick={() => {
              if (typeof otherUser.user === "string") return;
              shallowPush(router, {
                ...router.query,
                chatId: otherUser.user._id,
              });
            }}
          >
            <CardHeader
              title={otherUser.user.displayName}
              subtitle={room.lastMessage}
              img={otherUser.user.pictureUrl}
              notifications={user.notifications}
            />
          </div>
        );
      })}
      {roomQuery.isLoading && (
        <div className="px-4">
          {[...Array(10)].map((_, index) => (
            <RoomListSkeleton key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomList;
