import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

import {
  ChatIcon,
  ClipboardListIcon,
  CurrencyDollarIcon,
  DocumentAddIcon,
  SearchIcon,
} from "@heroicons/react/outline";

import NavigationButton from "components/Button/NavigationButton";
// import CreatePost from "domain/Post/CreatePost";
import {
  useDeliveredOrderCount,
  useIsSeller,
  useNotificationCount,
} from "domain/User/hooks";
import { shallowPush } from "utils/routing";

const CreatePost = dynamic(
  () => import("domain/Post/CreatePost")
) as () => JSX.Element;

const BottomNavbar = () => {
  const router = useRouter();
  const isSeller = useIsSeller();
  const orderCountQuery = useDeliveredOrderCount();
  const notificationCountQuery = useNotificationCount();
  return (
    <>
      <div className="select-none pt-14 relative">
        <div className="fixed z-[5] inset-x-0 -bottom-0.5 rounded-t-2xl bg-white ring-1 ring-zinc-400 dark:ring-0 dark:bg-zinc-800">
          <div className="mx-auto flex max-w-sm justify-around">
            <NavigationButton path="/posts" text="開心團購">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="logo" src="/logo.png" />
            </NavigationButton>
            <NavigationButton path="/super-buy" text="超便宜團購">
              <CurrencyDollarIcon />
            </NavigationButton>
            {isSeller && (
              <NavigationButton
                text="新增貼文"
                onClick={() =>
                  shallowPush(router, { ...router.query, createPost: "open" })
                }
              >
                <DocumentAddIcon />
              </NavigationButton>
            )}
            <NavigationButton path="/chat" text="聊天室">
              <div className="relative">
                <ChatIcon />
                {!!notificationCountQuery.data?.notificationCount && (
                  <div className="absolute -top-3.5 -right-3 rounded-full bg-red-600 text-sm text-white">
                    <div className="mx-2 my-0.5">
                      {notificationCountQuery.data.notificationCount}
                    </div>
                  </div>
                )}
              </div>
            </NavigationButton>
            <NavigationButton path="/orders" text="我的訂單">
              <div className="relative">
                <ClipboardListIcon />
                {!!orderCountQuery.data?.orderCount && (
                  <div className="absolute -top-3.5 -right-3 rounded-full bg-red-600 text-sm text-white">
                    <div className="mx-2 my-0.5">
                      {orderCountQuery.data.orderCount}
                    </div>
                  </div>
                )}
              </div>
            </NavigationButton>
            <NavigationButton path="/search" text="搜尋">
              <SearchIcon />
            </NavigationButton>
          </div>
        </div>
      </div>
      {isSeller && <CreatePost />}
    </>
  );
};

export default BottomNavbar;
