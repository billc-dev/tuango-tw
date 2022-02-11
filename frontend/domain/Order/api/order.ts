import axios, { AxiosResponse } from "axios";
import { IPost } from "domain/Post/post";
import { IOrder, IOrderForm } from "../order";

export const fetchOrders = async (
  postId: string
): Promise<{ orders: IOrder[] }> => {
  const res = await axios.get(`/orders/post/${postId}`);

  return { orders: res.data.orders };
};

interface CreateOrderProps {
  orderForm: IOrderForm;
}

type CreateOrder = (
  variables: CreateOrderProps
) => Promise<AxiosResponse<{ order?: IOrder; error?: Error; post?: IPost }>>;

export const createOrder: CreateOrder = ({ orderForm }) => {
  return axios.put("/orders/order", { orderForm });
};
