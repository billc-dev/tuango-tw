import React, { FC } from "react";

import Table from "components/Table/Table";
import TableBody from "components/Table/TableBody";
import TableCell from "components/Table/TableCell";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TextField from "components/TextField";

import { CreateOrderItem } from "../types";

interface Props {
  orderItems: CreateOrderItem[];
  handleChange: (
    index: number
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  notExtra?: boolean;
}

const OrderTable: FC<Props> = ({ orderItems, handleChange, notExtra }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell noPadding>ID</TableCell>
          <TableCell noPadding className="w-1/2">
            商品名稱
          </TableCell>
          <TableCell noPadding>數量</TableCell>
          <TableCell noPadding>單價</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orderItems.map((item, index) => (
          <TableRow key={item.id + index}>
            <TableCell noPadding>{item.id}</TableCell>
            <TableCell noPadding>{item.item}</TableCell>
            <TableCell noPadding>
              <TextField
                className="w-10 sm:w-14"
                variant="standard"
                name="qty"
                type="number"
                noLabel
                placeholder={!notExtra ? item.itemQty.toString() : "數量"}
                value={item.qty}
                error={
                  !notExtra
                    ? item.qty && item.qty > item.itemQty
                      ? `數量超過${item.itemQty}`
                      : ""
                    : ""
                }
                onChange={handleChange(index)}
              />
            </TableCell>
            <TableCell noPadding>
              <TextField
                className="w-14"
                variant="standard"
                name="price"
                type="number"
                value={item.price}
                onChange={handleChange(index)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderTable;
