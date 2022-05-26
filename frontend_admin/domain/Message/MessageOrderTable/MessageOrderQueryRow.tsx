import React, { FC } from "react";

import Button from "components/Button";
import Checkbox from "components/Checkbox";
import Select from "components/Select";
import TableCell from "components/Table/TableCell";
import TableRow from "components/Table/TableRow";
import TextField from "components/TextField";
import { IOrder } from "domain/Order/types";
import UserQuery from "domain/User/UserQuery";

import { MessageOrderQuery } from "../types";

interface Props {
  query: MessageOrderQuery;
  setQuery: React.Dispatch<React.SetStateAction<MessageOrderQuery>>;
  setUserIds: React.Dispatch<React.SetStateAction<string[]>>;
  orders?: IOrder[];
}

const MessageOrderQueryRow: FC<Props> = ({
  query,
  setQuery,
  setUserIds,
  orders,
}) => {
  const handleSetQuery = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const { name, value } = e.currentTarget;
    if (!name) return;
    setQuery((query) => ({ ...query, [name]: value }));
  };
  const handleReset = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!name) return;
    if (value !== "") return;
    setQuery((query) => ({ ...query, [name]: value }));
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (!name) return;
    setQuery((query) => ({ ...query, [name]: value }));
  };
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!orders) return;
    const { checked } = e.target;
    if (checked) {
      const userIds: string[] = [];
      for (const order of orders) {
        if (!userIds.includes(order.userId)) userIds.push(order.userId);
      }
      setUserIds(userIds);
    } else setUserIds([]);
  };
  return (
    <TableRow>
      <TableCell>
        <Checkbox checkboxSize="large" onChange={handleCheck} />
      </TableCell>
      <TableCell noPadding className="align-bottom flex flex-wrap">
        <UserQuery
          placeholder="名稱"
          setUser={(user) =>
            setQuery((query) => ({
              ...query,
              userId: user.username,
              FB: false,
            }))
          }
          variant="standard"
          noLabel
        />
        <Button
          variant={query.FB ? "blue" : undefined}
          onClick={() => setQuery((query) => ({ ...query, FB: !query.FB }))}
        >
          FB
        </Button>
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
          value={query.status}
          height="normal"
          name="status"
          onChange={handleChange}
          options={[
            { label: "全部", value: "" },
            { label: "已下訂 🦓", value: "ordered" },
            { label: "已到貨 🚚", value: "delivered" },
            { label: "尋貨中 🔍", value: "missing" },
            { label: "已取消 ❌", value: "canceled" },
          ]}
        />
      </TableCell>
    </TableRow>
  );
};

export default MessageOrderQueryRow;
