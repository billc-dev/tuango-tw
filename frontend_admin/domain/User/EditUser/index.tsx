import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

import { shallowPush } from "utils";

import Button from "components/Button";
import Dialog from "components/Dialog";
import LoadingIndicator from "components/Indicator/LoadingIndicator";

import { useUser } from "../hooks";
import EditUserForm from "./EditUserForm";

interface Props {
  userId: string;
}

const EditUser: FC<Props> = ({ userId }) => {
  const router = useRouter();
  const userQuery = useUser(userId);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    const { edit_user_id, ...query } = router.query;
    shallowPush(router, query);
  };

  useEffect(() => {
    if (userQuery.data) setOpen(true);
  }, [userQuery.data]);

  useEffect(() => {
    return () => userQuery.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <LoadingIndicator loading={userQuery.isLoading} />
      <Dialog
        {...{
          handleClose,
          open,
          title: "編輯用戶",
          action: (
            <Button variant="primary" form="user-form" type="submit" size="lg">
              編輯用戶
            </Button>
          ),
        }}
      >
        {userQuery.data && (
          <EditUserForm {...{ user: userQuery.data, handleClose }} />
        )}
      </Dialog>
    </>
  );
};

export default EditUser;
