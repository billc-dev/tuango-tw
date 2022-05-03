import React from "react";

import {
  ChatIcon,
  ClipboardListIcon,
  HomeIcon,
  SearchIcon,
} from "@heroicons/react/outline";

import NavigationButton from "components/Button/NavigationButton";

const BottomNavbar = () => {
  return (
    <>
      <div className="select-none pt-14 relative">
        <div className="fixed z-[5] inset-x-0 -bottom-0.5 rounded-t-2xl bg-white ring-1 ring-zinc-400 dark:ring-0 dark:bg-zinc-800">
          <div className="mx-auto flex max-w-sm justify-around">
            <NavigationButton path="/posts" text="首頁">
              <HomeIcon />
            </NavigationButton>

            <NavigationButton path="/chat" text="聊天室">
              <div className="relative">
                <ChatIcon />
              </div>
            </NavigationButton>
            <NavigationButton path="/orders" text="我的訂單">
              <div className="relative">
                <ClipboardListIcon />
              </div>
            </NavigationButton>
            <NavigationButton path="/search" text="搜尋">
              <SearchIcon />
            </NavigationButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomNavbar;
