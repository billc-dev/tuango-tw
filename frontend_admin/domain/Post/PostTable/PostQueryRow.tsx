import React, { FC } from "react";

import Select from "components/Select";
import TableCell from "components/Table/TableCell";
import TableRow from "components/Table/TableRow";
import TextField from "components/TextField";

import { PostQuery } from "../types";

interface Props {
  setQuery: React.Dispatch<React.SetStateAction<PostQuery>>;
}

const PostQueryRow: FC<Props> = ({ setQuery }) => {
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
  return (
    <TableRow>
      <TableCell noPadding>
        <TextField
          className="w-20 lg:w-32"
          type="number"
          name="postNum"
          placeholder="流水編號"
          noLabel
          variant="standard"
          onChange={handleReset}
          onKeyDown={handleSetQuery}
        />
      </TableCell>
      <TableCell></TableCell>
      <TableCell>
        <TextField
          className="w-28 lg:w-60"
          name="title"
          placeholder="團購主題"
          noLabel
          variant="standard"
          onChange={handleReset}
          onKeyDown={handleSetQuery}
        />
      </TableCell>
      <TableCell>
        <TextField
          className="w-20 lg:w-40"
          name="displayName"
          placeholder="開單者"
          noLabel
          variant="standard"
          onChange={handleReset}
          onKeyDown={handleSetQuery}
        />
      </TableCell>
      <TableCell></TableCell>
      <TableCell>
        <Select
          className="mb-0"
          variant="contained"
          height="normal"
          name="storageType"
          onChange={handleChange}
          options={[
            { label: "全部", value: "" },
            { label: "常溫", value: "roomTemp" },
            { label: "冷藏 ❄️", value: "refrigerated" },
            { label: "冷凍 🧊", value: "frozen" },
          ]}
        />
      </TableCell>
      <TableCell>
        <TextField
          className="w-14 lg:w-[114px]"
          name="deadline"
          type="date"
          variant="standard"
          onChange={handleChange}
        />
      </TableCell>
      <TableCell>
        <TextField
          className="w-14 lg:w-[114px]"
          name="deliveryDate"
          type="date"
          variant="standard"
          onChange={handleChange}
        />
      </TableCell>
      <TableCell>
        <Select
          className="mb-0"
          variant="contained"
          height="normal"
          name="status"
          onChange={handleChange}
          options={[
            { label: "全部", value: "" },
            { label: "未結單", value: "open" },
            { label: "已結單", value: "closed" },
            { label: "已完成", value: "completed" },
            { label: "已取消", value: "canceled" },
          ]}
        />
      </TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell>
        {/* <IconButton onClick={() => setQuery({})}>
          <RefreshIcon />
        </IconButton> */}
      </TableCell>
    </TableRow>
  );
};

export default PostQueryRow;
