import * as yup from "yup";

export const orderItemSchema = yup.object({
  id: yup.string().required(),
  item: yup.string().required(),
  price: yup.number().required().positive().integer(),
  qty: yup.number().required().min(1).integer(),
  itemQty: yup.number().required(),
});

export const orderFormSchema = yup.object({
  postId: yup.string().required(),
  items: yup.array(orderItemSchema).min(1),
  comment: yup.string(),
});

export type IOrderForm = yup.InferType<typeof orderFormSchema>;
