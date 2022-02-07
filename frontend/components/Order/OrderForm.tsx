import { MinusIcon, PlusIcon } from "@heroicons/react/outline";
import Card from "components/Core/Card";
import React, { FC } from "react";
import { Item } from "types";
import { useImmer } from "use-immer";
import * as yup from "yup";
import produce from "immer";
import axios from "axios";

const orderFormSchema = yup.object({
  items: yup
    .array(
      yup.object({
        _id: yup.string(),
        id: yup.string().required(),
        item: yup.string().required(),
        price: yup.number().required().positive().integer(),
        qty: yup.number().required().min(1).integer(),
        itemQty: yup.number(),
      })
    )
    .min(1),
});

interface IOrderForm extends yup.InferType<typeof orderFormSchema> {}

interface Props {
  items: Item[];
  postId: string;
}

const OrderForm: FC<Props> = ({ items, postId }) => {
  const [orderForm, setOrderForm] = useImmer<IOrderForm>({
    items: items.map((item) => ({
      _id: item._id,
      id: item.id,
      item: item.item,
      price: item.price,
      itemQty: item.itemQty,
      qty: 0,
    })),
  });

  const validate = async () => {
    const cleanedOrderForm = produce(orderForm, (draft) => {
      if (!draft.items) return;
      draft.items.forEach((item, index) => {
        if (item.qty <= 0) draft.items?.splice(index, 1);
      });
    });
    console.log(cleanedOrderForm);

    try {
      const validated = await orderFormSchema.validate(cleanedOrderForm, {
        abortEarly: false,
      });
      return validated;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        console.log(error.errors);
      }
    }
  };

  const handleChangeItemQty = (amount: number, index: number, id: string) => {
    setOrderForm((draft) => {
      if (!draft.items) return;
      if (draft.items[index].id !== id) return;
      draft.items[index].qty += amount;
    });
  };

  const handleSubmit = async () => {
    const order = await validate();
    if (order) {
      axios.put("/orders/order", { orderForm: order, postId });
    }
  };

  return (
    <Card>
      <div className="flex flex-col items-center justify-center p-3">
        {orderForm?.items?.map((item, index) => (
          <div
            key={item._id}
            className="flex w-full flex-col items-center justify-center"
          >
            <span className="font-semibold">{`${item.id}.${item.item} $${item.price}`}</span>
            <div className="flex w-2/5 items-center justify-between">
              <button
                disabled={item.qty === 0}
                className="rounded-full p-2 active:bg-zinc-300 disabled:text-gray-300 disabled:hover:bg-transparent disabled:active:bg-transparent sm:hover:bg-zinc-300"
                onClick={() => handleChangeItemQty(-1, index, item.id)}
              >
                <MinusIcon className="h-6 w-6" />
              </button>
              <div className="select-none px-2 text-xl">{item.qty}</div>
              <button
                className="rounded-full p-2 active:bg-zinc-300 sm:hover:bg-zinc-300"
                onClick={() => handleChangeItemQty(1, index, item.id)}
              >
                <PlusIcon className="h-6 w-6" />
              </button>
            </div>
            {item.itemQty}
          </div>
        ))}
      </div>
      <button
        className="bg-line-400 active:bg-line-800 h-12 w-full text-lg font-semibold text-white"
        onClick={() => handleSubmit()}
      >
        合計${"amount"}
      </button>
    </Card>
  );
};

export default OrderForm;
