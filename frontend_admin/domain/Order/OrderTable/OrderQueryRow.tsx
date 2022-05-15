import React, { FC } from "react";

import TableCell from "components/Table/TableCell";
import TableRow from "components/Table/TableRow";
import TextField from "components/TextField";
import UserQuery from "domain/User/UserQuery";

import { OrderQuery } from "../types";

interface Props {
  setQuery: React.Dispatch<React.SetStateAction<OrderQuery>>;
}

const OrderHead: FC<Props> = () => {
  return (
    <TableRow>
      <TableCell noPadding>
        <UserQuery
          placeholder="開單者"
          isSeller
          setUser={() => {}}
          variant="standard"
          noLabel
        />
      </TableCell>
      <TableCell noPadding>
        <TextField
          className="w-20 xl:w-32"
          type="number"
          name="postNum"
          placeholder="流水編號"
          noLabel
          variant="standard"
          // onChange={handleReset}
          // onKeyDown={handleSetQuery}
        />
      </TableCell>
      <TableCell>狀態</TableCell>
      <TableCell center>編緝</TableCell>
    </TableRow>
  );
};

export default OrderHead;
