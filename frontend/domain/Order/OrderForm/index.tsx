import Card from "components/Card";
import AnimatedSpinner from "components/svg/AnimatedSpinner";
import TextArea from "components/TextField/TextArea";
import React, { FC } from "react";
import toast from "react-hot-toast";
import { Updater } from "use-immer";
import { useCreateOrder } from "../hooks";
import { validateOrder } from "../services";
import { getOrderSum } from "../services/calc";
import { IOrderForm } from "../types";
import OrderItem from "./OrderItem";

interface Props {
  orderForm: IOrderForm;
  setOrderForm: Updater<IOrderForm>;
}

const OrderForm: FC<Props> = ({ orderForm, setOrderForm }) => {
  const sum = getOrderSum(orderForm.items);
  const createOrder = useCreateOrder(setOrderForm);
  const handleCreateOrder = async () => {
    const validatedOrderForm = await validateOrder(orderForm);
    if (!validatedOrderForm) return;
    toast.loading("訂單製作中...", { id: "orderToast" });
    createOrder.mutate({ orderForm: validatedOrderForm });
  };

  return (
    <Card>
      <div className="flex flex-col items-center justify-center p-3">
        {orderForm?.items?.map((item, index) => (
          <OrderItem
            key={index}
            index={index}
            item={item}
            setOrderForm={setOrderForm}
          />
        ))}
      </div>
      <div className="px-2">
        <TextArea
          placeholder="備註"
          value={orderForm.comment}
          onChange={(e) =>
            setOrderForm((draft) => {
              draft.comment = e.target.value;
            })
          }
        />
      </div>
      <button
        disabled={sum <= 0 || createOrder.isLoading}
        className="bg-line-400 hover:bg-line-700 active:bg-line-800 flex h-12 w-full items-center justify-center text-lg font-semibold text-white transition disabled:bg-zinc-300"
        onClick={() => handleCreateOrder()}
      >
        {createOrder.isLoading ? <AnimatedSpinner /> : `合計$${sum}`}
      </button>
    </Card>
  );
};

export default OrderForm;
