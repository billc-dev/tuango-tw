import React, { FC, Fragment, useState } from "react";

import { ChevronDownIcon } from "@heroicons/react/outline";

import Card from "components/Card";
import { usePost } from "domain/Post/hooks";
import { useUser } from "domain/User/hooks";

import { useOrders } from "../hooks";
import OrderListItem from "./OrderListItem";

interface Props {
  postId: string;
}

const Order: FC<Props> = ({ postId }) => {
  const userQuery = useUser();
  const postQuery = usePost(postId);
  const { data } = useOrders(postId);
  const [open, setOpen] = useState(false);

  return data && data?.orders.length > 0 ? (
    <Card>
      {!open && data.orders.length > 3 && (
        <button
          onClick={() => setOpen(true)}
          className="flex h-10 w-full items-center justify-center bg-zinc-300 text-sm outline-2 transition hover:bg-zinc-600 hover:text-white dark:bg-zinc-600 dark:hover:bg-zinc-500"
        >
          <ChevronDownIcon className="mr-2 h-4 w-4" />
          查看所有訂單
        </button>
      )}
      <div className="p-3 pt-0">
        {data?.orders.slice(open ? 0 : -3).map((order) => (
          <Fragment key={order._id}>
            <OrderListItem
              post={postQuery.data?.post}
              order={order}
              user={userQuery.data?.data.user}
            />
          </Fragment>
        ))}
      </div>
    </Card>
  ) : null;
};

export default Order;
