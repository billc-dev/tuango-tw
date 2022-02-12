import Card from "components/Card";
import { isAuthenticated } from "domain/User/api";
import React, { FC } from "react";
import { Updater } from "use-immer";
import { useCreateOrder } from "../hooks";
import { IOrderForm } from "../order";
import { validateOrder } from "../services";
import OrderItem from "./OrderItem";

interface Props {
  orderForm: IOrderForm;
  setOrderForm: Updater<IOrderForm>;
}

const OrderForm: FC<Props> = ({ orderForm, setOrderForm }) => {
  const createOrder = useCreateOrder();
  console.log(isAuthenticated());

  const handleCreateOrder = async () => {
    const validatedOrderForm = await validateOrder(orderForm);
    if (!validatedOrderForm) return;
    createOrder.mutate({ orderForm: validatedOrderForm });
  };
  // create async catcher that shows toast

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
      <div>
        <input
          value={orderForm.comment}
          onChange={(e) =>
            setOrderForm((draft) => {
              draft.comment = e.target.value;
            })
          }
        />
      </div>
      <button
        className="bg-line-400 active:bg-line-800 h-12 w-full text-lg font-semibold text-white"
        onClick={() => handleCreateOrder()}
      >
        合計${"amount"}
      </button>
    </Card>
  );
};

export default OrderForm;
