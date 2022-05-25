import React, { FC, useEffect, useState } from "react";

import toast from "react-hot-toast";
import { Updater } from "use-immer";

import Card from "components/Card";
import CardSubmitButton from "components/Card/CardSubmitButton";
import TextArea from "components/TextField/TextArea";
import { IPost } from "domain/Post/types";
import { useScrollIntoView } from "hooks/useScrollIntoView";

import { useCreateOrder, useOrders } from "../hooks";
import { calcSumOrders, getOrderSum, validateOrder } from "../services";
import { IOrderForm, SumOrder } from "../types";
import OrderItem from "./OrderItem";

interface Props {
  orderForm: IOrderForm;
  setOrderForm: Updater<IOrderForm>;
  post: IPost;
}

const OrderForm: FC<Props> = ({ orderForm, setOrderForm, post }) => {
  const { isLoading, data } = useOrders(orderForm.postId);
  const { ref } = useScrollIntoView(isLoading, "order");

  const [sumOrders, setSumOrders] = useState<SumOrder[]>();
  const sum = getOrderSum(orderForm.items);
  const createOrder = useCreateOrder(setOrderForm);

  const handleCreateOrder = async () => {
    const validatedOrderForm = await validateOrder(orderForm);
    if (!validatedOrderForm) return;
    toast.loading("訂單製作中...", { id: "orderToast" });
    createOrder.mutate({ orderForm: validatedOrderForm });
  };

  useEffect(() => {
    if (!data) return;
    setSumOrders(calcSumOrders(post, data.orders));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.orders]);

  return (
    <Card>
      <div className="relative">
        <div ref={ref} className="absolute -top-12" />
      </div>
      <div className="flex flex-col items-center justify-center p-3">
        {orderForm?.items?.map((item, index) => (
          <OrderItem
            key={index}
            {...{ index, item, setOrderForm, sumOrders }}
          />
        ))}
      </div>
      <div className="px-2">
        <TextArea
          hiddenLabel
          placeholder="備註"
          value={orderForm.comment}
          onChange={(e) =>
            setOrderForm((draft) => {
              draft.comment = e.target.value;
            })
          }
        />
      </div>
      <CardSubmitButton
        disabled={sum <= 0}
        loading={createOrder.isLoading}
        onClick={() => handleCreateOrder()}
      >{`合計$${sum}`}</CardSubmitButton>
    </Card>
  );
};

export default OrderForm;
