import React, { FC } from "react";

import Button from "components/Button";
import Checkbox from "components/Checkbox";
import TableCell from "components/Table/TableCell";
import TableRow from "components/Table/TableRow";
import { getOrderStatusLabel, getOrderTitle } from "domain/Order/services";
import { IOrder } from "domain/Order/types";
import { copyToClipboard } from "services";
import { getFullLengthDate } from "services/date";

interface Props {
  order: IOrder;
  userIds: string[];
  setUserIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const MessageOrderRow: FC<Props> = ({ order, userIds, setUserIds }) => {
  const { displayName, createdAt, orderNum, status } = order;
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    if (!checked) {
      setUserIds((userIds) =>
        userIds.filter((userId) => userId !== order.userId)
      );
    } else setUserIds((userIds) => [...userIds, order.userId]);
  };
  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checkboxSize="large"
          checked={userIds.includes(order.userId)}
          onChange={handleCheck}
        />
      </TableCell>
      <TableCell>
        <Button onClick={() => copyToClipboard(displayName, "名稱")}>
          {displayName}
        </Button>
      </TableCell>
      <TableCell>
        <p>{getOrderTitle(order)}</p>
        <p>{getFullLengthDate(createdAt)}</p>
        <p>序號: {orderNum}</p>
        {order.order.map((item, index) => (
          <p key={item.id + index}>
            {item.id}.{item.item}+{item.qty}
          </p>
        ))}
      </TableCell>
      <TableCell>{getOrderStatusLabel(status)}</TableCell>
    </TableRow>
  );
};

export default MessageOrderRow;
