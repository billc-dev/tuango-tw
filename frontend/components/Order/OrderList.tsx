import { fetchOrders } from "api/orders";
import Header from "components/Core/Header";
import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { ChevronDownIcon } from "@heroicons/react/outline";
import Card from "components/Core/Card";

interface Props {
  postId: string;
}
const Order: FC<Props> = ({ postId }) => {
  const { data, isLoading } = useQuery(postId, () => fetchOrders(postId), {
    refetchOnMount: "always",
  });
  const [scrolled, setScrolled] = useState(true);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.hash === "#order") setScrolled(false);
  }, []);

  useEffect(() => {
    if (!ref?.current || !document || scrolled) return;

    if (data && data?.orders.length > 0 && !isLoading) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
      setScrolled(true);
    }
  }, [data?.orders.length, scrolled, isLoading, data]);
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
      <div className="relative p-3 pt-0">
        <div ref={ref} className="absolute -top-28" />
        {data?.orders.slice(open ? 0 : -3).map((order) => (
          <Fragment key={order._id}>
            <Header
              img={order.pictureUrl}
              title={order.displayName}
              subtitle={order.createdAt}
            />
            <ul className="-mt-2 text-sm">序號: {order.orderNum}</ul>
            {order.order.map((item, index) => (
              <ul key={index} className="text-sm">
                {`${item.id}. ${item.item}+${item.qty} $${item.price}`}
              </ul>
            ))}
          </Fragment>
        ))}
      </div>
    </Card>
  ) : null;
};

export default Order;
