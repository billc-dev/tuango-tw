import { useEffect, useState } from "react";

import { PostOrdersParams, usePostOrders } from "domain/Order/hooks";
import { usePostByPostNum } from "domain/Post/hooks";
import { getPostTitle } from "domain/Post/services";

import CreateOrderedOrder from "./CreateOrderedOrder";
import DeliverHistory from "./DeliverHistory";
import DeliverQuery from "./DeliverQuery";
import DeliverTable from "./DeliverTable";
import OrderTable from "./OrderTable";
import PostItemTable from "./PostItemTable";

const Deliver = () => {
  const [value, setValue] = useState("");
  const [postNum, setPostNum] = useState("");
  const postQuery = usePostByPostNum(postNum);
  const queryKey: PostOrdersParams = {
    postId: postQuery.data?._id,
    status: "ordered",
  };
  const ordersQuery = usePostOrders(queryKey);

  useEffect(() => {
    return () => ordersQuery.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="max-w-xl my-2 mx-auto">
      <DeliverQuery
        isLoading={postQuery.isLoading || ordersQuery.isLoading}
        {...{ value, setValue, setPostNum }}
      />
      {ordersQuery.data && (
        <div className="mt-2 overflow-y-auto">
          <p className="font-medium">{getPostTitle(postQuery.data)}</p>
          {postQuery.data && (
            <DeliverTable
              {...{ queryKey, post: postQuery.data, setPostNum, setValue }}
            />
          )}
          {postQuery.data && ordersQuery.data.length > 0 && (
            <PostItemTable
              {...{ post: postQuery.data, postQueryKey: queryKey }}
            />
          )}
          <CreateOrderedOrder {...{ postNum }} />
          {ordersQuery.data.length > 0 ? (
            <>
              <OrderTable orders={ordersQuery.data} />
              <CreateOrderedOrder {...{ postNum }} />
            </>
          ) : (
            <p className="text-center">目前沒有已下訂的訂單</p>
          )}
        </div>
      )}
      <DeliverHistory />
    </div>
  );
};

export default Deliver;
