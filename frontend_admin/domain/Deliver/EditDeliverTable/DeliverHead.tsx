import React from "react";

import TableCell from "components/Table/TableCell";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";

const DeliverHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>序號</TableCell>
        <TableCell>名稱</TableCell>
        <TableCell>數量</TableCell>
        <TableCell>小計</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default DeliverHead;
