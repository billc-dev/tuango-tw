import React, { FC, useEffect, useState } from "react";

import Button from "components/Button";
import PopupDialog from "components/Dialog/PopupDialog";
import { PostOrdersParams, usePostOrders } from "domain/Order/hooks";
import { IPost } from "domain/Post/types";

import { useDeliverOrders } from "../hooks";
import { useDeliverSum } from "../services";
import { IItemLocation } from "../types";
import ItemsTable from "./ItemsTable";
import TotalItemsTable from "./TotalItemsTable";

interface Props {
  queryKey: PostOrdersParams;
  post: IPost;
  setPostNum: React.Dispatch<React.SetStateAction<string>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const DeliverTable: FC<Props> = ({ queryKey, post, setPostNum, setValue }) => {
  const ordersQuery = usePostOrders(queryKey);
  const sum = useDeliverSum(post, ordersQuery.data);
  const deliverOrders = useDeliverOrders();
  const totalItems = sum?.totalItems.filter((item) => item.qty > 0);
  const [open, setOpen] = useState(false);
  const [itemLocation, setItemLocation] = useState<IItemLocation[]>(
    post.items.map((item) => ({
      ...item,
      location: "",
      checked: false,
      qty: 0,
    }))
  );
  const handleSubmit = () => {
    if (!ordersQuery.data) return;
    if (!sum) return;
    const orders = ordersQuery.data.map((order) => {
      const orderItems = order.order.map((item) => {
        if (item.status !== "delivered") return item;
        const index = itemLocation.findIndex(
          (location) => location.id === item.id
        );
        if (index === -1) return item;
        return {
          ...item,
          item: itemLocation[index].item,
          location: itemLocation[index].location,
        };
      });
      return { ...order, order: orderItems };
    });
    const { normalItemSum, extraItemSum, totalItemSum } = sum;
    deliverOrders.mutate(
      { orders, normalItemSum, extraItemSum, totalItemSum },
      {
        onSuccess: () => {
          setPostNum("");
          setValue("");
          ordersQuery.remove();
        },
      }
    );
  };

  useEffect(() => {
    setItemLocation((itemLocation) => {
      if (!totalItems) return itemLocation;
      return itemLocation.map((item) => {
        const index = totalItems.findIndex((i) => i.id === item.id);
        if (index === -1) return { ...item, qty: 0 };
        return {
          ...item,
          qty: totalItems[index].qty,
        };
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ordersQuery.data]);
  return (
    <div>
      <Button
        disabled={ordersQuery.data?.length === 0}
        variant="primary"
        fullWidth
        onClick={() => setOpen(true)}
      >
        儲存
      </Button>
      {open && (
        <PopupDialog
          title={`您確定要存檔?`}
          confirmComponent
          onConfirm={handleSubmit}
          loading={deliverOrders.isLoading}
          handleClose={() => setOpen(false)}
          {...{ open }}
        />
      )}
      {sum && totalItems && totalItems.length > 0 && (
        <TotalItemsTable {...{ sum }} />
      )}
      {totalItems && totalItems.length > 0 && (
        <ItemsTable {...{ itemLocation, setItemLocation }} />
      )}
    </div>
  );
};

export default DeliverTable;
