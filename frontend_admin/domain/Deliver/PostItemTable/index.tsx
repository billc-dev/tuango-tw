import React, { FC } from "react";

import { useQueryClient } from "react-query";

import Select from "components/Select";
import Table from "components/Table/Table";
import TableBody from "components/Table/TableBody";
import TableCell from "components/Table/TableCell";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import { PostOrdersParams } from "domain/Order/hooks";
import { IOrder } from "domain/Order/types";
import { IPost } from "domain/Post/types";

interface Props {
  post: IPost;
  postQueryKey: PostOrdersParams;
}

const PostItemTable: FC<Props> = ({ post }) => {
  const queryClient = useQueryClient();
  const queryKey = ["postOrders", { postId: post._id, status: "ordered" }];
  const handleItemChange = (id: string) => {
    return (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      const orders = queryClient.getQueryData<IOrder[]>(queryKey);
      if (!orders) return;
      const updatedOrders = orders.map((order) => {
        if (!order.checked) return order;
        const orderItems = order.order.map((ordItem) => {
          if (ordItem.id !== id) return ordItem;
          return { ...ordItem, [name]: value };
        });
        return { ...order, order: orderItems };
      });
      queryClient.setQueryData<IOrder[]>(queryKey, updatedOrders);
    };
  };
  return (
    <div>
      <Table className="text-sm">
        <TableHead>
          <TableRow className="whitespace-nowrap">
            <TableCell>ID</TableCell>
            <TableCell>商品名稱</TableCell>
            <TableCell>狀態</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {post.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.item}</TableCell>
              <TableCell noPadding>
                <Select
                  className="max-w-[104px] h-8"
                  name="status"
                  onChange={handleItemChange(item.id)}
                  options={[
                    { label: "已下訂 🦓", value: "ordered" },
                    { label: "已到貨 🚚", value: "delivered" },
                    { label: "已取消 ❌", value: "canceled" },
                  ]}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostItemTable;
