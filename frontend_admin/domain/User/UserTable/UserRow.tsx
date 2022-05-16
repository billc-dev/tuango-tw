import router from "next/router";
import React, { FC } from "react";

import { PencilIcon } from "@heroicons/react/outline";
import { shallowPush } from "utils";

import { IUser } from "api/auth/userDB";
import IconButton from "components/Button/IconButton";
import TableCell from "components/Table/TableCell";
import TableRow from "components/Table/TableRow";

import { getUserRoleLabel, getUserStatusLabel } from "../services";

interface Props {
  user: IUser;
}

const UserRow: FC<Props> = ({ user }) => {
  const { pickupNum, displayName, notified, status, role } = user;
  return (
    <TableRow className="whitespace-nowrap">
      <TableCell>{pickupNum}</TableCell>
      <TableCell>{displayName}</TableCell>
      <TableCell>{notified ? "已設定" : "未設定 ❌"}</TableCell>
      <TableCell>{getUserStatusLabel(status)}</TableCell>
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
