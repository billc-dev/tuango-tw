import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";

import Button from "components/Button";
import Dialog from "components/Dialog";
import { WINDOW_URL } from "utils/constants";
import { shallowPush } from "utils/routing";

import { useIsAuthenticated, useSetupNotify, useUser } from "./hooks";

const NotifySetup = () => {
  const router = useRouter();
  const { code } = router.query;
  const userQuery = useUser();
  const setupNotfiy = useSetupNotify();
  const isAuthenticated = useIsAuthenticated();
  const [mutated, setMutated] = useState(false);
  useEffect(() => {
    if (!userQuery.data?.data.user) return;
    if (userQuery.data.data.user.notified) return;
    if (!code) return;
    if (!isAuthenticated) return;
    if (typeof code !== "string") return;
    if (mutated) return;
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
    setMutated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, userQuery.data?.data.user, isAuthenticated]);

  if (!userQuery.data?.data.user) return null;
  const { notified } = userQuery.data.data.user;

  const isRegistered = userQuery.data.data.user.status === "registered";
  return (!userQuery.isLoading && !notified) || isRegistered ? (
    <Dialog
      open={!notified || isRegistered}
      title={!notified ? "設定 LINE NOTIFY" : "審核中..."}
      handleClose={() => {
        userQuery.refetch();
      }}
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
        </>
      ) : (
        <>
          <p className="text-center mt-4">⚠️ 需要加May為好友才會被核准喔!</p>
        </>
      )}
    </Dialog>
  ) : null;
};

export default NotifySetup;
