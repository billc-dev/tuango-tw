import React, { ChangeEvent, Dispatch, FC } from "react";

import Checkbox from "components/Checkbox";
import { IOrder } from "domain/Order/types";

interface Props {
  order: IOrder;
  userIds: string[];
  setUserIds: Dispatch<React.SetStateAction<string[]>>;
}

const OrderRow: FC<Props> = (props) => {
  const { order, userIds, setUserIds } = props;
  const { orderNum, displayName, comment } = order;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const { checked } = e.target;
    handleCheck(checked);
  };
  const handleClick = () => {
    const checked = userIds.includes(order.userId);
    handleCheck(!checked);
  };
  const handleCheck = (checked: boolean) => {
    if (checked) {
      if (userIds.includes(order.userId)) return;
      setUserIds([...userIds, order.userId]);
    } else setUserIds(userIds.filter((id) => id !== order.userId));
  };
  return (
    <tr
      key={order._id}
      className="border-b cursor-pointer"
      onClick={handleClick}
    >
      <td className="py-2">
        <Checkbox
          checkboxSize="large"
          checked={userIds.includes(order.userId)}
          onChange={handleChange}
        />
      </td>
      <td className="py-2">{orderNum}</td>
      <td className="py-2">{displayName}</td>
      <td className="py-2">
        {order.order.map((item) => (
          <div key={item.id}>
            {item.id}+{item.qty}
          </div>
        ))}
      </td>
      <td className="py-2">{comment}</td>
    </tr>
  );
};

export default OrderRow;
