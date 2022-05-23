import React, { FC } from "react";

import Table from "components/Table/Table";
import TableBody from "components/Table/TableBody";
import TableCell from "components/Table/TableCell";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import { getNumberWithCommas } from "services/math";

import { DeliverItemsAndSums } from "../types";

interface Props {
  sum: DeliverItemsAndSums;
}

const TotalItemsTable: FC<Props> = ({ sum }) => {
  const { totalItems } = sum;
  return (
    <Table className="text-sm">
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>商品名稱</TableCell>
          <TableCell className="text-right">數量</TableCell>
          <TableCell className="text-right">小計</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {totalItems.map((item, index) => {
          if (item.qty === 0) return null;
          return (
            <TableRow key={index}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.item}</TableCell>
              <TableCell className="text-right">{item.qty}</TableCell>
              <TableCell className="text-right">
                ${getNumberWithCommas(item.amount)}
              </TableCell>
            </TableRow>
          );
        })}
        {typeof sum?.normalItemSum !== "undefined" && sum.normalItemSum > 0 && (
          <TableRow>
            <TableCell colSpan={2} className="text-right">
              小計${getNumberWithCommas(sum.normalItemSum)}
            </TableCell>
            <TableCell className="text-right">x94%</TableCell>
            <TableCell className="text-right">
              ${getNumberWithCommas(Math.round(sum.normalItemSum * 0.94))}
            </TableCell>
          </TableRow>
        )}
        {typeof sum?.extraItemSum !== "undefined" && sum.extraItemSum > 0 && (
          <TableRow>
            <TableCell colSpan={2} className="text-right">
              待認購小計${getNumberWithCommas(sum.extraItemSum)}
            </TableCell>
            <TableCell className="text-right">x90%</TableCell>
            <TableCell className="text-right">
              ${getNumberWithCommas(Math.round(sum.extraItemSum * 0.9))}
            </TableCell>
          </TableRow>
        )}
        {typeof sum?.totalItemSum !== "undefined" && (
          <TableRow>
            <TableCell colSpan={4} className="text-right">
              總計$
              {getNumberWithCommas(
                Math.round(sum.normalItemSum * 0.94) +
                  Math.round(sum.extraItemSum * 0.9)
              )}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TotalItemsTable;
