import * as yup from "yup";

export const orderItemSchema = yup.object({
  _id: yup.string(),
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

export interface IOrderForm extends yup.InferType<typeof orderFormSchema> {}
