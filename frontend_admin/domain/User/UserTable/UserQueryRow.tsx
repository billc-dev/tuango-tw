import { useRouter } from "next/router";
import React, { FC } from "react";

import { RefreshIcon } from "@heroicons/react/outline";

import { IUser } from "api/auth/userDB";
import IconButton from "components/Button/IconButton";
import Select from "components/Select";
import TableCell from "components/Table/TableCell";
import TableRow from "components/Table/TableRow";
import TextField from "components/TextField";

import UserQuery from "../UserQuery";
import { IUserQuery } from "../types";

interface Props {
  setQuery: React.Dispatch<React.SetStateAction<IUserQuery>>;
}

const UserQueryRow: FC<Props> = ({ setQuery }) => {
  const router = useRouter();
  const handleSetQuery = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const { name, value } = e.currentTarget;
    if (!name) return;
    setQuery((query) => ({
      ...query,
      [name]: value,
      page: 0,
    }));
  };
  const handleReset = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!name) return;
    if (value !== "") return;
    setQuery((query) => ({
      ...query,
      [name]: value,
      page: 0,
    }));
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (!name) return;
    setQuery((query) => ({
      ...query,
      [name]: value,
      page: 0,
    }));
  };
  const setUser = (user: IUser) => {
    setQuery((query) => ({ ...query, username: user.username }));
  };
  return (
    <TableRow className="whitespace-nowrap">
      <TableCell noPadding>
        <TextField
          className="w-20 lg:w-44"
          type="number"
          name="postNum"
          placeholder="會員編號"
          noLabel
          variant="standard"
          onChange={handleReset}
          onKeyDown={handleSetQuery}
        />
      </TableCell>
      <TableCell noPadding className="max-w-[80px] align-bottom">
        <UserQuery
          placeholder="名稱"
          setUser={setUser}
          variant="standard"
          noLabel
        />
      </TableCell>
      <TableCell className="min-w-[60px] align-bottom" noPadding>
        <Select
          height="normal"
          name="notified"
          onChange={handleChange}
          options={[
            { label: "全部", value: "" },
            { label: "已設定", value: true },
            { label: "未設定 ❌", value: false },
          ]}
        />
      </TableCell>
      <TableCell className="min-w-[80px] align-bottom" noPadding>
        <Select
          height="normal"
          name="status"
          onChange={handleChange}
          options={[
            { label: "全部", value: "" },
            { label: "已申請", value: "registered" },
            { label: "已核准", value: "approved" },
            { label: "已封鎖", value: "blocked" },
          ]}
        />
      </TableCell>
      <TableCell className="min-w-[80px] align-bottom" noPadding>
        <Select
          height="normal"
          name="role"
          onChange={handleChange}
          options={[
            { label: "全部", value: "" },
            { label: "買家", value: "basic" },
            { label: "賣家", value: "seller" },
          ]}
        />
      </TableCell>
      <TableCell noPadding>
        <IconButton onClick={() => router.reload()}>
          <RefreshIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default UserQueryRow;
