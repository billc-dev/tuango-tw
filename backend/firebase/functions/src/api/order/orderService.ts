import { getCurrentDate } from "utils/date";
import { IPost, Item } from "api/post/post";
import { IUser } from "api/user/userDB";
import { MongooseOrder } from "./order";
import Order from "./orderDB";
import { IOrderForm, orderFormSchema } from "./orderSchema";

export const validateOrderForm = (orderForm: IOrderForm) => {
  return orderFormSchema.validate(orderForm, {
    abortEarly: true,
    stripUnknown: true,
  });
};

export const isOverItemQty = (items: Item[], orderForm: IOrderForm) => {
  let over = false;

  orderForm.items!.every((item) => {
    const index = items.findIndex((i) => i.id === item.id);
    if (item.qty <= items[index].itemQty) return true;
    over = true;
    return false;
  });

  return over;
};

export const createNewOrder = async (
  post: IPost,
  orderForm: IOrderForm,
  user: IUser
) => {
  const prevOrder = await Order.findOne({
    postId: post._id,
    status: { $ne: "canceled" },
  }).sort({ orderNum: -1 });

  const imageUrl = () => {
    const image = post.imageUrls[0];
    if (typeof image === "object" && image !== null) return image.sm;
    else return image;
  };

  const order = new Order({
    orderNum: prevOrder ? prevOrder.orderNum + 1 : 1,
    userId: user.username,
    displayName: user.displayName,
    sellerDisplayName: post.displayName,
    postNum: post.postNum,
    title: post.title,
    pictureUrl: user.pictureUrl,
    postId: post._id,
    imageUrl: imageUrl(),
    order: orderForm.items,
    comment: orderForm.comment,
    orderHistory: [{ status: "ordered" }],
  });

  await order.save();

  return order;
};

export const cancelOrder = async (order: MongooseOrder) => {
  order.status = "canceled";
  order.orderHistory.push({
    status: "canceled",
    createdAt: getCurrentDate(),
  });
  await order.save();
};
