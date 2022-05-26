import React from "react";

import { ArrowRightIcon, DuplicateIcon } from "@heroicons/react/outline";
import toast from "react-hot-toast";

import Button from "components/Button";
import Dialog from "components/Dialog";
import { useUser } from "domain/User/hooks";

import ChatPlugin from "./ChatPlugin";

const MessengerSetup = () => {
  const userQuery = useUser();
  if (!userQuery.data?.data.user) return null;
  const { notified } = userQuery.data.data.user;
  const isRegistered = userQuery.data.data.user.status === "registered";

  return (!userQuery.isLoading && !notified) || isRegistered ? (
    <Dialog
      open={!notified || isRegistered}
      title={!notified ? "設定FB通知" : "審核中..."}
      handleClose={() => {
        userQuery.refetch();
      }}
      className="z-50"
    >
      {!notified ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <p className="text-2xl mt-2">1.按複製認證碼</p>
          <Button
            fullWidth
            size="lg"
            variant="blue"
            className="mt-2"
            icon={<DuplicateIcon />}
            onClick={() => {
              navigator.clipboard.writeText(
                `認證碼: ${userQuery.data.data.user.username}`
              );
              toast.success("已複製認證碼！");
            }}
          >
            複製認證碼
          </Button>
          <p className="text-2xl mt-2 fixed bottom-4 w-1/2 bg-zinc-200 dark:bg-zinc-600 p-2 rounded">
            2.按Messenger並貼上認證碼
          </p>
          <div className="fixed bottom-4 right-24">
            <ArrowRightIcon className="h-20" />
          </div>
          <ChatPlugin />
        </>
      ) : (
        <>
          <p className="text-center mt-4">
            ⚠️ 需要加Candy Cheng為好友才會被核准喔!
          </p>
        </>
      )}
    </Dialog>
  ) : null;
};

export default MessengerSetup;
