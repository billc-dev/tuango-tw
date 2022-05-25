import React from "react";

import TableCell from "components/Table/TableCell";
import TableRow from "components/Table/TableRow";

const MessageOrderHead = () => {
  return (
    <TableRow className="whitespace-nowrap">
      <TableCell></TableCell>
      <TableCell className="md:min-w-[120px] pl-0">名稱</TableCell>
      <TableCell className="pl-0">訂單</TableCell>
      <TableCell className="pl-0">狀態</TableCell>
    </TableRow>
  );
};

export default MessageOrderHead;
