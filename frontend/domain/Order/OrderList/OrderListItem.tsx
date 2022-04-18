import React, { FC } from "react";

import Header from "components/Card/CardHeader";
import MessageButton from "domain/Chat/MessageButton";
import { IPost } from "domain/Post/types";
import { User } from "domain/User/types";
import { getFullDate } from "services/date";

import { IOrder } from "../types";
import DeleteOrder from "./DeleteOrder";
import HasNameButton from "./HasNameButton";

interface Props {
  order: IOrder;
  user?: User;
  post: IPost;
}

const OrderListItem: FC<Props> = ({ order, user, post }) => {
  const isBuyer = user?.username !== order.userId;
  const isSeller = user?.username === post.userId;
  const isAdmin = user?.role === "admin";

  const showMessageButton = () => {
    return user?.role !== "basic" && isBuyer && isSeller;
  };

  return (
    <>
      <Header
        img={order.pictureUrl}
        title={order.displayName}
        subtitle={getFullDate(order.createdAt)}
        action={
          <>
            <DeleteOrder {...{ order, user, post }} />
            {showMessageButton() && (
              <MessageButton {...{ order, username: order.userId }} />
            )}
          </>
        }
      />
      <div className="-mt-2">
        序號: {order.orderNum} {order.status === "delivered" && "已到貨 🚚"}
        {order.status === "completed" && "已取貨 ✅"}
        {order.status === "missing" && "尋貨中 🔍"}
      </div>
      {order.order.map((item, index) => (
        <ul key={index} className="text-sm">
          {item.id}. {item.item}+{item.qty}{" "}
          {(isSeller || isAdmin) && "$" + item.qty * item.price}
        </ul>
      ))}
      {order.comment && (
        <p className="whitespace-pre pt-1 text-sm">備註: {order.comment}</p>
      )}
      {post?.status !== "open" && (
        <HasNameButton {...{ postId: post._id, order }} />
      )}
    </>
  );
};

export default OrderListItem;
