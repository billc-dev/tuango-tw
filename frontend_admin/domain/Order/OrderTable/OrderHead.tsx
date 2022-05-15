import React from "react";

import TableCell from "components/Table/TableCell";
import TableRow from "components/Table/TableRow";

const OrderHead = () => {
  return (
    <TableRow className="whitespace-nowrap">
      <TableCell className="min-w-[120px]">名稱</TableCell>
      <TableCell>訂單</TableCell>
      <TableCell>狀態</TableCell>
      <TableCell center>編緝</TableCell>
    </TableRow>
  );
};

export default OrderHead;
