import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

import Dialog from "components/Dialog";
import AnimatedSpinner from "components/svg/AnimatedSpinner";
import ClosePostButton from "domain/Post/PostSellerActions/ClosePostButton";
import { usePost } from "domain/Post/hooks";
import { getFullTitle } from "domain/Post/services";
import { shallowPush } from "utils/routing";

import { useOrders } from "../hooks";
import { calcSumOrders } from "../services";
import { SumOrder } from "../types";

interface Props {
  postId: string;
}

const OrderDialog: FC<Props> = ({ postId }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [sumOrders, setSumOrders] = useState<SumOrder[]>([]);
  const postQuery = usePost(postId);
  const { data, isLoading } = useOrders(postId, { status: "ordered" });
  const handleClose = () => {
    const { orderDialog, ...query } = router.query;
    shallowPush(router, query);
  };
  const getPostTitle = () => {
    if (postQuery.data) {
      const { postNum, title, displayName } = postQuery.data.post;
      return `#${postNum} ${title} ~${displayName}`;
    }
    return "";
  };
  const sum = sumOrders.reduce((sum, item) => (sum += Number(item.amount)), 0);

  useEffect(() => (postId ? setOpen(true) : setOpen(false)), [postId]);
  useEffect(() => {
    if (postQuery.data && data?.orders)
      setSumOrders(calcSumOrders(postQuery.data.post, data.orders));
  }, [postQuery.data, data?.orders]);
  return (
    <>
      <div
        className={`rounded shadow transition-opacity bg-zinc-200 p-1.5 fixed top-16 left-3 z-50 ${
          isLoading || postQuery.isLoading ? "opacity-95" : "opacity-0"
        }`}
      >
        <AnimatedSpinner />
      </div>
      {data?.orders && (
        <Dialog
          open={open}
          handleClose={handleClose}
          title={getFullTitle(postQuery.data?.post)}
        >
          {postQuery.data ? (
            <ClosePostButton
              postId={postId}
              status={postQuery.data.post.status}
            />
          ) : null}
          {data.orders.length > 0 && (
            <>
              <table className="table-auto w-full mt-2">
                <thead>
                  <tr className="whitespace-nowrap text-left border-b-2">
                    <th className="font-normal">序號</th>
                    <th className="font-normal">稱呼</th>
                    <th className="font-normal">訂單</th>
                    <th className="font-normal">備註</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.orders.map((order) => {
                    const { orderNum, displayName, comment } = order;
                    return (
                      <tr key={order._id} className="border-b">
                        <td className="py-2">{orderNum}</td>
                        <td className="py-2">{displayName}</td>
                        <td className="py-2">
                          {order.order.map((item) => (
                            <div key={item.id}>
                              {`${item.id}.${item.item}+${item.qty}`}{" "}
                            </div>
                          ))}
                        </td>
                        <td className="py-2">{comment}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p className="text-red-500 text-center font-medium mt-4">
                送貨前，請將以下的資訊截圖給我們！
              </p>
              <p className="text-red-500 text-center">
                若數量不足，請提前告知我們！
              </p>
              <p className="mt-2 font-medium">{getPostTitle()}</p>
              <table className="table-auto w-full mt-2">
                <thead>
                  <tr className="whitespace-nowrap text-left border-b-2">
                    <th className="font-normal">ID</th>
                    <th className="font-normal">名稱</th>
                    <th className="font-normal">數量</th>
                    <th className="font-normal">小計</th>
                  </tr>
                </thead>
                <tbody>
                  {sumOrders.map((item) => {
                    const { id, qty, amount } = item;
                    return (
                      <tr key={item.id} className="border-b">
                        <td className="py-2">{id}</td>
                        <td className="py-2">{item.item}</td>
                        <td className="py-2">{qty}</td>
                        <td className="py-2">
                          {"$"}
                          {amount}
                        </td>
                      </tr>
                    );
                  })}
                  {sumOrders.length > 1 && (
                    <tr className="border-b">
                      <td></td>
                      <td>金額</td>
                      <td></td>
                      <td>
                        {"$"}
                        {sum}
                      </td>
                    </tr>
                  )}
                  <tr className="border-b">
                    <td></td>
                    <td>平台費</td>
                    <td>6%</td>
                    <td>
                      {"$"}
                      {Math.round(sum * 0.06)}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td></td>
                    <td>總計</td>
                    <td></td>
                    <td>
                      {"$"}
                      {Math.round(sum * 0.94)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
          {data.orders.length === 0 && (
            <p className="text-center pt-2">您目前沒有未送貨的訂單</p>
          )}
        </Dialog>
      )}
    </>
  );
};

export default OrderDialog;
