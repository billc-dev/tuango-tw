import React from "react";

import { DuplicateIcon } from "@heroicons/react/outline";
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
          <img
            className="mx-auto block border-4 border-black mt-2 w-10/12"
            src="https://firebasestorage.googleapis.com/v0/b/tuango-tw.appspot.com/o/ezgif.com-gif-maker%20(1).gif?alt=media&token=f3479817-027e-4ace-8a01-65a5ec4f09d4"
            alt="line notify setup tutorial"
          />
          <Button
            variant="blue"
            className="mx-auto mt-2 mb-32"
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
