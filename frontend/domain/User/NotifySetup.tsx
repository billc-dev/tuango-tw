import { useRouter } from "next/router";
import React, { useEffect } from "react";

import toast from "react-hot-toast";

import Button from "components/Button";
import Dialog from "components/Dialog";
import { WINDOW_URL } from "utils/constants";
import { shallowPush } from "utils/routing";

import { useSetupNotify, useUser } from "./hooks";

const NotifySetup = () => {
  const router = useRouter();
  const { code } = router.query;
  const userQuery = useUser();
  const setupNotfiy = useSetupNotify();
  useEffect(() => {
    if (!userQuery.data?.data.user) return;
    if (userQuery.data.data.user.notified) return;
    if (!code) return;
    if (typeof code !== "string") return;
    toast.loading("設定中...", { id: "setupNotify" });
    setupNotfiy.mutate(
      { code, redirectUrl: `${WINDOW_URL}/posts` },
      {
        onSuccess: () => {
          toast.success("設定成功", { id: "setupNotify" });
          const { code, state, ...query } = router.query;
          shallowPush(router, query);
        },
        onError: () => {
          toast.error("設定失敗", { id: "setupNotify" });
          const { code, state, ...query } = router.query;
          shallowPush(router, query);
        },
      }
    );
  }, [code, userQuery.data?.data.user]);

  if (!userQuery.data?.data.user) return null;
  const { notified } = userQuery.data.data.user;

  return !userQuery.isLoading && !notified ? (
    <Dialog open={!notified} title="設定 LINE NOTIFY" handleClose={() => {}}>
      <img
        className="mx-auto block border-4 border-black mt-2 w-10/12"
        src="https://firebasestorage.googleapis.com/v0/b/tuango-tw.appspot.com/o/ezgif.com-gif-maker%20(1).gif?alt=media&token=f3479817-027e-4ace-8a01-65a5ec4f09d4"
        alt="line notify setup tutorial"
      />
      <Button
        fullWidth
        size="lg"
        variant="primary"
        className="mx-auto mt-2 py-4"
        onClick={() =>
          window.open(
            `https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=mUFAgYh1Jbzgbk0Jb7bolA&redirect_uri=${WINDOW_URL}/posts&scope=notify&state=NO_STATE`,
            "_self"
          )
        }
      >
        邀請開心機器人加入1對1聊天
      </Button>
    </Dialog>
  ) : null;
};

export default NotifySetup;
