import React from "react";

import TableCell from "components/Table/TableCell";
import TableRow from "components/Table/TableRow";

const UserHead = () => {
  return (
    <TableRow className="whitespace-nowrap">
      <TableCell>會員編號</TableCell>
      <TableCell className="md:min-w-[120px]">名稱</TableCell>
      <TableCell>Notify</TableCell>
      <TableCell>狀態</TableCell>
      <TableCell>身份</TableCell>
      <TableCell center>編緝</TableCell>
    </TableRow>
  );
};

export default UserHead;
