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
import { useUser } from "domain/User/hooks";
import { shallowPush } from "utils/routing";

const CreatePost = dynamic(() => import("domain/Post/CreatePost"));

const BottomNavbar = () => {
  const router = useRouter();
  const userQuery = useUser();
  const isSeller =
    userQuery.data &&
    ["seller", "admin"].includes(userQuery.data.data.user.role);
  return (
    <>
      <div className="select-none pt-14">
        <div className="fixed inset-x-0 bottom-0 block rounded-t-2xl bg-white py-2 px-0 dark:bg-zinc-800">
          <div className="m-auto flex max-w-[384px] justify-around">
            <NavigationButton path="/posts" text="首頁">
              <HomeIcon />
            </NavigationButton>
            {isSeller && (
              <>
                <NavigationButton
                  text="新增貼文"
                  onClick={() =>
                    shallowPush(router, { ...router.query, createPost: "open" })
                  }
                >
                  <DocumentAddIcon />
                </NavigationButton>
              </>
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
