import { useRouter } from "next/router";
import React, { FC } from "react";

import { RefreshIcon } from "@heroicons/react/outline";

import { IUser } from "api/auth/userDB";
import IconButton from "components/Button/IconButton";
import Select from "components/Select";
import TableCell from "components/Table/TableCell";
import TableRow from "components/Table/TableRow";
import TextField from "components/TextField";
import UserQuery from "domain/User/UserQuery";

import { OrderQuery } from "../types";

interface Props {
  setQuery: React.Dispatch<React.SetStateAction<OrderQuery>>;
}

const OrderHead: FC<Props> = ({ setQuery }) => {
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
    setQuery((query) => ({ ...query, userId: user.username }));
  };
  return (
    <TableRow>
      <TableCell noPadding className="max-w-[80px] align-bottom">
        <UserQuery
          placeholder="名稱"
          isSeller
          setUser={setUser}
          variant="standard"
          noLabel
        />
      </TableCell>
      <TableCell noPadding>
        <TextField
          className="w-32 lg:w-44"
          type="number"
          name="postNum"
          placeholder="流水編號"
          noLabel
          variant="standard"
          onChange={handleReset}
          onKeyDown={handleSetQuery}
        />
        <TextField
          className="w-32 lg:w-44"
          name="text"
          placeholder="關鍵字"
          noLabel
          variant="standard"
          onChange={handleReset}
          onKeyDown={handleSetQuery}
        />
      </TableCell>
      <TableCell className="min-w-[80px] align-bottom" noPadding>
        <Select
          height="normal"
          name="status"
          onChange={handleChange}
          options={[
            { label: "全部", value: "" },
            { label: "已下訂 🦓", value: "ordered" },
            { label: "已到貨 🚚", value: "delivered" },
            { label: "已取貨 ✅", value: "completed" },
            { label: "尋貨中 🔍", value: "missing" },
            { label: "已取消 ❌", value: "canceled" },
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

export default OrderHead;
