import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

import Button from "components/Button";
import TextField from "components/TextField";
import { usePostOrders } from "domain/Order/hooks";
import { usePostByPostNum } from "domain/Post/hooks";
import { getPostTitle } from "domain/Post/services";

import OrderTable from "./OrderTable";

const Deliver = () => {
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");
  const [postNum, setPostNum] = useState("");
  const handleSubmit = () => {
    if (!(Number(value) >= 0))
      return toast.error("流水編號有誤！", { id: "postNumError" });
    setPostNum(value);
    queryClient.invalidateQueries("postOrders", { active: true });
  };
  const postQuery = usePostByPostNum(postNum);
  const ordersQuery = usePostOrders({
    postId: postQuery.data?._id,
    status: "ordered",
  });

  useEffect(() => {
    return () => ordersQuery.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="my-2 mx-auto">
      <form
        className="flex"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextField
          value={value}
          variant="standard"
          noLabel
          placeholder="流水編號"
          onChange={(e) => setValue(e.target.value)}
        />
        <Button type="submit">搜尋</Button>
      </form>
      {ordersQuery.data && (
        <div className="mt-2 overflow-y-auto -ml-1">
          <p className="font-medium">{getPostTitle(postQuery.data)}</p>
          <OrderTable orders={ordersQuery.data} />
        </div>
      )}
    </div>
  );
};

export default Deliver;
