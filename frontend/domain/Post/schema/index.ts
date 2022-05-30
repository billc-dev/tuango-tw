import * as yup from "yup";

const itemsSchema = yup
  .array(
    yup.object({
      _id: yup.string(),
      item: yup.string().required("請輸入商品名稱!").default(""),
      price: yup
        .number()
        .required("請輸入商品價格!")
        .integer("請輸入商品價格!")
        .typeError("請輸入商品價格!")
        .default(undefined),
      itemQty: yup
        .number()
        .required("請輸入商品數量!")
        .integer("請輸入商品數量!")
        .typeError("請輸入商品數量!")
        .default(100),
    })
  )
  .min(1)
  .defined()
  .default([{ _id: undefined, item: "", price: undefined, itemQty: 100 }]);

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
  title: yup.string().required("請輸入團購主題!").default("").trim(),
  storageType: yup
    .mixed()
    .oneOf(["roomTemp", "farmGoods", "refrigerated", "frozen"])
    .required()
    .default("roomTemp"),
  deadline: yup.string().default(""),
  deliveryDate: yup
    .string()
    .default("")
    .test(
      "isThursday",
      "⚠️ 禮拜四為腳踏車進貨日！請勿將進貨日設為禮拜四！",
      (value) => new Date(value).getDay() !== 4
    ),
  body: yup.string().required("請輸入團購內容!").default("").trim(),
  items: itemsSchema,
  imageUrls: imageUrlsSchema,
});

export interface PostFormSchema extends yup.InferType<typeof postSchema> {}
