import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

import {
  ChatIcon,
  ClipboardListIcon,
  DocumentAddIcon,
  HomeIcon,
  SearchIcon,
} from "@heroicons/react/outline";

import NavigationButton from "components/Button/NavigationButton";
// import CreatePost from "domain/Post/CreatePost";
import { useIsSeller } from "domain/User/hooks";
import { shallowPush } from "utils/routing";

const CreatePost = dynamic(
  () => import("domain/Post/CreatePost")
) as () => JSX.Element;

const BottomNavbar = () => {
  const router = useRouter();
  const isSeller = useIsSeller();
  return (
    <>
      <div className="select-none pt-14">
        <div className="fixed inset-x-0 bottom-0 rounded-t-2xl bg-white dark:bg-zinc-800 overflow-hidden">
          <div className="m-auto flex max-w-sm justify-around">
            <NavigationButton path="/posts" text="首頁">
              <HomeIcon />
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
              <ChatIcon />
            </NavigationButton>
            <NavigationButton path="/orders" text="我的訂單">
              <ClipboardListIcon />
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
