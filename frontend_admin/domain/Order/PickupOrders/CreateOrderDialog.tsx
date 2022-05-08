import React, { FC, useState } from "react";

import Dialog from "components/Dialog";
import Table from "components/Table/Table";
import TableBody from "components/Table/TableBody";
import TableCell from "components/Table/TableCell";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TextField from "components/TextField";

import { IOrder } from "../types";

interface Props {
  open: boolean;
  handleClose: () => void;
  order: IOrder;
}

const CreateOrderDialog: FC<Props> = ({ open, handleClose, order }) => {
  const [orderItems, setOrderItems] = useState(
    order.order.map((ord) => ({
      ...ord,
      qty: undefined,
      itemQty: ord.qty,
    }))
  );
  const handleChange = (index: number) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setOrderItems((orderItems) => {
        return orderItems.map((item, idx) => {
          if (idx === index) return { ...item, [name]: value };
          return item;
        });
      });
    };
  };
  return (
    <Dialog title="新增訂單" {...{ open, handleClose }}>
      <div className="mt-2">
        <p>
          #{order.postNum} {order.title} #{order.sellerDisplayName}
        </p>
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
                    className="w-10"
                    variant="standard"
                    name="qty"
                    type="number"
                    noLabel
                    placeholder={item.itemQty.toString()}
                    value={item.qty}
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
      </div>
    </Dialog>
  );
};

export default CreateOrderDialog;
