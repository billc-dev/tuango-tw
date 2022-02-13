import {
  ChatAltIcon,
  ClipboardListIcon,
  DocumentAddIcon,
  HomeIcon,
} from "@heroicons/react/outline";
import NavigationButton from "components/Button/NavigationButton";
import React from "react";

const BottomNavbar = () => {
  return (
    <div className="pt-14">
      <div className="fixed inset-x-0 bottom-0 block rounded-t-2xl bg-white py-2 px-0 dark:bg-zinc-800">
        <div className="flex justify-around">
          <NavigationButton path="/posts" text="首頁">
            <HomeIcon />
          </NavigationButton>
          <NavigationButton text="新增貼文">
            <DocumentAddIcon />
          </NavigationButton>
          <NavigationButton path="/chat" text="聊天室">
            <ChatAltIcon />
          </NavigationButton>
          <NavigationButton path="/orders" text="我的訂單">
            <ClipboardListIcon />
          </NavigationButton>
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
