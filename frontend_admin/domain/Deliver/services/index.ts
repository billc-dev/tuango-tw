import React from "react";

import { IOrder } from "domain/Order/types";

import { IDeliver } from "../types";

export const getAmounts = (deliver: IDeliver) => {
  const { normalTotal, normalFee, extraTotal, extraFee } = deliver;
  return { normalTotal, normalFee, extraTotal, extraFee };
};

export const useHandleEditOrders = (
  setOrder: React.Dispatch<React.SetStateAction<IOrder>>
) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setOrder((order) => ({ ...order, [name]: value }));
  };
  const handleItemChange = (index: number) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setOrder((order) => {
        const orderItems = order.order.map((item, idx) => {
          if (index !== idx) return item;
          return { ...item, [name]: value };
        });
        return { ...order, order: orderItems };
      });
    };
  };
  const handleItemHasName = (index: number) => {
    return () => {
      setOrder((order) => {
        const orderItems = order.order.map((item, idx) => {
          if (index !== idx) return item;
          return { ...item, hasName: !item.hasName };
        });
        return { ...order, order: orderItems };
      });
    };
  };
  return { handleChange, handleItemChange, handleItemHasName };
};
