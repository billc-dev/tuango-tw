import React, { FC } from "react";

import { MinusIcon, PlusIcon } from "@heroicons/react/outline";

import IconButton from "components/Button/IconButton";
import * as gtag from "domain/GoogleAnalytics/gtag";

import { incrementOrderItemQty } from "../services";
import { IOrderForm, IOrderItem, SumOrder } from "../types";

interface Props {
  item: IOrderItem;
  setOrderForm: React.Dispatch<React.SetStateAction<IOrderForm>>;
  sumOrders: SumOrder[] | undefined;
}

const OrderItem: FC<Props> = ({ item, setOrderForm, sumOrders }) => {
  const sumItem = sumOrders?.find((i) => i.id === item.id);
  const handleChangeItemQty = (amount: number) => {
    return () => {
      setOrderForm((orderForm) => {
        if (!orderForm.items) return orderForm;
        const items = incrementOrderItemQty(item, orderForm.items, amount);
        const gtagItem: Gtag.Item[] = [
          {
            id: `${item.id + item.item}`,
            name: item.item,
            quantity: 1,
            price: item.price,
          },
        ];
        if (amount === 1) gtag.event("add_to_cart", { items: gtagItem });
        else if (amount === -1)
          gtag.event("remove_from_cart", { items: gtagItem });
        return { ...orderForm, items };
      });
    };
  };
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div>
        <span>{`${item.id}.${item.item} $${item.price}`}</span>
        {sumItem && <span>~訂購數量{sumItem.qty}</span>}
      </div>
      <div className="flex w-2/5 items-center justify-between">
        <IconButton disabled={item.qty === 0} onClick={handleChangeItemQty(-1)}>
          <MinusIcon />
        </IconButton>
        <div className="select-none px-2 text-xl">{item.qty}</div>
        <IconButton
          disabled={item.itemQty <= item.qty}
          onClick={handleChangeItemQty(1)}
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
