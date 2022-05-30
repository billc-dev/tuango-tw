import router from "next/router";
import React, { FC } from "react";

import { PencilIcon } from "@heroicons/react/outline";
import { shallowPush } from "utils";

import { IUser } from "api/auth/userDB";
import Button from "components/Button";
import IconButton from "components/Button/IconButton";
import TableCell from "components/Table/TableCell";
import TableRow from "components/Table/TableRow";

import { useApproveUser } from "../hooks";
import { getUserRoleLabel, getUserStatusLabel } from "../services";

interface Props {
  user: IUser;
}

const UserRow: FC<Props> = ({ user }) => {
  const { pickupNum, displayName, notified, status, role } = user;
  const approveUser = useApproveUser();
  const handleApproveUser = () => {
    approveUser.mutate(user._id);
  };
  return (
    <TableRow className="whitespace-nowrap">
      <TableCell>{pickupNum}</TableCell>
      <TableCell>
        <div className="flex items-center">
          <span>{displayName}</span>
          <div>
            {user.fb && (
              <Button className=" ml-1" variant="blue" size="small">
                FB
              </Button>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell>{notified ? "已設定" : "未設定 ❌"}</TableCell>
      <TableCell>
        {notified ? (
          status === "registered" ? (
            <Button variant="primary" onClick={handleApproveUser}>
              核准
            </Button>
          ) : (
            getUserStatusLabel(status)
          )
        ) : (
          getUserStatusLabel(status)
        )}
      </TableCell>
      <TableCell>{getUserRoleLabel(role)}</TableCell>
      <TableCell>
        <IconButton
          onClick={() =>
            shallowPush(router, { ...router.query, edit_user_id: user._id })
          }
        >
          <PencilIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
