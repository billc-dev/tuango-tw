import React, { FC, useState } from "react";

import { PlusIcon } from "@heroicons/react/outline";

import IconButton from "components/Button/IconButton";
import Select from "components/Select";
import { Item } from "domain/Post/types";

import { IOrder, OrderItem, OrderStatus } from "../types";

interface Props {
  items: Item[];
  setOrder: React.Dispatch<React.SetStateAction<IOrder>>;
  status?: OrderStatus;
}

const AddItem: FC<Props> = ({ items, setOrder, status }) => {
  const [item_id, setItem_id] = useState(items[0]._id);
  const handleAdd = () => {
    const postItem = items.find((item) => item._id === item_id);
    if (!postItem) return;
    const { id, item, price } = postItem;
    const newItem: OrderItem = {
      id,
      item,
      price,
      qty: 1,
      status: status ?? "delivered",
      hasName: false,
      location: "",
    };
    setOrder((order) => ({ ...order, order: [...order.order, newItem] }));
  };
  return (
    <div className="mt-2">
      <p>新增商品</p>
      <div className="flex">
        <div className="w-1/2">
          <Select
            name="status"
            value={item_id}
            className="mb-0"
            height="normal"
            options={items.map((item) => ({
              label: `${item.id}. ${item.item}`,
              value: item._id,
            }))}
            onChange={(e) => setItem_id(e.target.value)}
          />
        </div>
        <IconButton onClick={() => handleAdd()}>
          <PlusIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default AddItem;
