import React from "react";

import TableCell from "components/Table/TableCell";
import TableRow from "components/Table/TableRow";

const OrderHead = () => {
  return (
    <TableRow className="whitespace-nowrap">
      <TableCell></TableCell>
      <TableCell className="whitespace-pre-line">序號</TableCell>
      <TableCell>名稱</TableCell>
      <TableCell>有貼名字</TableCell>
      <TableCell>訂單</TableCell>
      <TableCell>單價</TableCell>
      <TableCell>狀態</TableCell>
      <TableCell>編輯</TableCell>
    </TableRow>
  );
};

export default OrderHead;
