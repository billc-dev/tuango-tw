import React, { FC } from "react";

import OrderHasNameButton from "components/Button/OrderHasNameButton";
import Checkbox from "components/Checkbox";
import Select from "components/Select";
import TableCell from "components/Table/TableCell";
import TableRow from "components/Table/TableRow";
import TextField from "components/TextField";
import { IOrder } from "domain/Order/types";

interface Props {
  order: IOrder;
}

const OrderRow: FC<Props> = ({ order }) => {
  const { orderNum, displayName, hasName } = order;
  return (
    <TableRow>
      <TableCell>
        <Checkbox checkboxSize="large" />
      </TableCell>
      <TableCell>{orderNum}</TableCell>
      <TableCell>{displayName}</TableCell>
      <TableCell>
        {hasName ? (
          <OrderHasNameButton short {...{ hasName }} />
        ) : (
          order.order.map((item, index) => (
            <OrderHasNameButton
              className="my-2"
              key={index}
              short
              hasName={item.hasName}
            />
          ))
        )}
      </TableCell>
      <TableCell>
        {order.order.map((item, index) => (
          <p key={index} className="my-4">
            {item.id}+{item.qty}
          </p>
        ))}
      </TableCell>
      <TableCell>
        {order.order.map((item, index) => (
          <TextField
            name="price"
            type="number"
            placeholder="單價"
            value={item.price}
            noLabel
            className="block max-w-[60px]"
            key={index}
            variant="standard"
          />
        ))}
      </TableCell>
      <TableCell>
        {order.order.map((item, index) => (
          <Select
            className="w-[84px]"
            key={index}
            value={item.status}
            height="normal"
            name="status"
            //   onChange={handleChange}
            options={[
              { label: "已下訂 🦓", value: "ordered" },
              { label: "已到貨 🚚", value: "delivered" },
              { label: "已取消 ❌", value: "canceled" },
            ]}
          />
        ))}
      </TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
};

export default OrderRow;
