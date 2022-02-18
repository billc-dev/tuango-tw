import Card from "components/Card";
import CardSubmitButton from "components/Card/CardSubmitButton";
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
      <CardSubmitButton
        disabled={sum <= 0}
        loading={createOrder.isLoading}
        onClick={() => handleCreateOrder()}
      >{`合計$${sum}`}</CardSubmitButton>
    </Card>
  );
};

export default OrderForm;
