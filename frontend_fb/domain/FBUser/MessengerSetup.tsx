import React from "react";

import Button from "components/Button";
import Dialog from "components/Dialog";
import MessengerIcon from "components/svg/MessengerIcon";
import { useUser } from "domain/User/hooks";

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
          <Button
            icon={<MessengerIcon />}
            className="mt-4"
            fullWidth
            size="lg"
            onClick={() => {
              window.open(
                `http://m.me/superbuytw?ref=認證碼:${userQuery.data.data.user._id}`,
                "_self"
              );
            }}
          >
            設定FB通知
          </Button>
        </>
      ) : (
        <>
          <Button
            className="mt-4"
            onClick={() =>
              window.open(
                "https://www.facebook.com/profile.php?id=100075794507933"
              )
            }
          >
            ⚠️ 需要加Candy Cheng為好友才會被核准喔!
          </Button>
        </>
      )}
    </Dialog>
  ) : null;
};

export default MessengerSetup;
