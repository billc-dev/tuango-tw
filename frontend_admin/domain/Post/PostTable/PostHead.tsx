import React from "react";

import TableCell from "components/Table/TableCell";
import TableRow from "components/Table/TableRow";

const PostHead = () => {
  return (
    <TableRow className="whitespace-nowrap">
      <TableCell>流水編號</TableCell>
      <TableCell>開單日</TableCell>
      <TableCell>團購主題</TableCell>
      <TableCell>開單者</TableCell>
      <TableCell>已到貨</TableCell>
      <TableCell className="min-w-[96px]">儲存方式</TableCell>
      <TableCell>結單日</TableCell>
      <TableCell>到貨日</TableCell>
      <TableCell className="min-w-[96px]">狀態</TableCell>
      <TableCell>金額</TableCell>
      <TableCell>服務費</TableCell>
      <TableCell className="min-w-[48px] xl:w-[74px] whitespace-pre-wrap">
        購買人數
      </TableCell>
      <TableCell>編緝</TableCell>
    </TableRow>
  );
};

export default PostHead;
