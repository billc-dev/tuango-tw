import produce from "immer";
import { Updater } from "use-immer";
import { ValidationError } from "yup";
import { IOrderForm } from "../order";
import { orderFormSchema } from "../orderSchema";

type HandleChangeItemQty = (
  amount: number,
  index: number,
  id: string,
  setOrderForm: Updater<IOrderForm>
) => void;

export const handleChangeItemQty: HandleChangeItemQty = (
  amount,
  index,
  id,
  setOrderForm
) => {
  setOrderForm((draft) => {
    if (!draft.items) return;
    if (draft.items[index].id !== id) return;
    draft.items[index].qty += amount;
  });
};

export const validateOrder = async (orderForm: IOrderForm) => {
  const cleanedOrderForm = produce(orderForm, (draft) => {
    if (!draft.items) return;
    draft.items = draft.items.filter((item) => item.qty > 0);
  });
  console.log(cleanedOrderForm);

  try {
    return await orderFormSchema.validate(cleanedOrderForm, {
      abortEarly: true,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(error.errors);
    }
  }
};
