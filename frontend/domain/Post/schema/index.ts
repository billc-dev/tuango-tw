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
  .default([]);

export const postSchema = yup.object({
  title: yup.string().required("請輸入團購主題!"),
  storageType: yup
    .mixed()
    .oneOf(["roomTemp", "refrigerated", "frozen"])
    .required()
    .default("roomTemp"),
  deadline: yup.string(),
  deliveryDate: yup.string(),
  body: yup.string().required("請輸入團購內容!"),
  items: itemsSchema,
  imageUrls: imageUrlsSchema,
});

export interface PostForm extends yup.InferType<typeof postSchema> {}
