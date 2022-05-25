import React, { FC } from "react";

import { MinusIcon, PlusIcon } from "@heroicons/react/outline";
import { Updater } from "use-immer";

import IconButton from "components/Button/IconButton";

import { handleChangeItemQty } from "../services";
import { IOrderForm, IOrderItem, SumOrder } from "../types";

interface Props {
  index: number;
  item: IOrderItem;
  setOrderForm: Updater<IOrderForm>;
  sumOrders: SumOrder[] | undefined;
}

const OrderItem: FC<Props> = ({ item, index, setOrderForm, sumOrders }) => {
  const sumItem = sumOrders?.find((i) => i.id === item.id);
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div>
        <span>{`${item.id}.${item.item} $${item.price}`}</span>
        {sumItem && <span>~訂購數量{sumItem.qty}</span>}
      </div>
      <div className="flex w-2/5 items-center justify-between">
        <IconButton
          disabled={item.qty === 0}
          onClick={() => handleChangeItemQty(-1, index, item.id, setOrderForm)}
        >
          <MinusIcon />
        </IconButton>
        <div className="select-none px-2 text-xl">{item.qty}</div>
        <IconButton
          disabled={item.itemQty <= item.qty}
          onClick={() => handleChangeItemQty(1, index, item.id, setOrderForm)}
        >
          <PlusIcon />
        </IconButton>
      </div>
      <div className="text-sm">
        {item.itemQty === 0 ? (
          <p className="text-red-500">已售完</p>
        ) : (
          <p>還剩{item.itemQty}件</p>
        )}
      </div>
    </div>
  );
};

export default OrderItem;
