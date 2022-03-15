import * as yup from "yup";

const itemsSchema = yup
  .array(
    yup.object({
      item: yup.string().required("請輸入商品名稱!"),
      price: yup
        .number()
        .required("請輸入商品價格!")
        .integer("請輸入商品價格!")
        .typeError("請輸入商品價格!"),
      itemQty: yup
        .number()
        .required("請輸入商品數量!")
        .integer("請輸入商品數量!")
        .typeError("請輸入商品數量!"),
    })
  )
  .min(1)
  .defined()
  .default([{ item: "", price: undefined, itemQty: 100 }]);

const imageUrlsSchema = yup
  .array(
    yup.object({
      sm: yup.string().url().required(),
      md: yup.string().url().required(),
      lg: yup.string().url().required(),
    })
  )
  .min(1, "請上傳圖片!")
  .defined()
  .default([]);

export const postSchema = yup.object({
  title: yup.string().required("請輸入團購主題!").default(""),
  storageType: yup
    .mixed()
    .oneOf(["roomTemp", "refrigerated", "frozen"])
    .required()
    .default("roomTemp"),
  deadline: yup.string().default(""),
  deliveryDate: yup.string().default(""),
  body: yup.string().required("請輸入團購內容!").default(""),
  items: itemsSchema,
  imageUrls: imageUrlsSchema,
});

export interface PostFormSchema extends yup.InferType<typeof postSchema> {}
