import React, { FC, useState } from "react";

import { PlusIcon, RefreshIcon } from "@heroicons/react/outline";
import toast from "react-hot-toast";

import Button from "components/Button";
import Dialog from "components/Dialog";
import TextField from "components/TextField";
import { useGetPostByPostNum } from "domain/Post/hooks";
import { IPost } from "domain/Post/types";

import { useCreateDeliveredOrder } from "../hooks";
import { CreateOrderItem } from "../types";
import OrderTable from "./OrderTable";

interface Props {
  username: string;
  open: boolean;
  handleClose: () => void;
  handleCloseExtraDialog: () => void;
}

const NewOrderDialog: FC<Props> = ({
  open,
  username,
  handleClose,
  handleCloseExtraDialog,
}) => {
  const [postNum, setPostNum] = useState("");
  const [post, setPost] = useState<IPost>();
  const [orderItems, setOrderItems] = useState<CreateOrderItem[]>();
  const [comment, setComment] = useState("");
  const getPostByPostNum = useGetPostByPostNum();
  const createOrder = useCreateDeliveredOrder();
  const enabled = orderItems?.some((item) => item.qty && item.qty > 0);
  const handleFetchPost = () => {
    if (!postNum) return;
    getPostByPostNum.mutate(postNum, {
      onSuccess: (post) => {
        setPost(post);
        setOrderItems(
          post.items.map((item) => ({ ...item, qty: "", status: "delivered" }))
        );
      },
    });
  };
  const handleChange = (index: number) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setOrderItems((orderItems) => {
        return orderItems?.map((item, idx) => {
          if (idx === index) return { ...item, [name]: value };
          return item;
        });
      });
    };
  };
  const handleSubmit = () => {
    if (!orderItems) return;
    if (!post) return;
    const items = orderItems.filter((item) => item.qty && item.qty > 0);
    createOrder.mutate(
      { username, comment, orderItems: items, postId: post._id },
      {
        onSuccess: () => {
          handleClose();
          handleCloseExtraDialog();
        },
        onError: () => {
          toast.error("??????????????????");
        },
      }
    );
  };

  return (
    <Dialog title="????????????" {...{ open, handleClose }}>
      <div className="mt-2">
        {orderItems && post ? (
          <>
            <Button
              icon={<RefreshIcon />}
              className="mb-2"
              fullWidth
              onClick={() => {
                setPost(undefined);
                setPostNum("");
              }}
            >
              ??????
            </Button>
            <p>
              #{post.postNum} {post.title} #{post.displayName}
            </p>
            <OrderTable notExtra {...{ orderItems, handleChange }} />
            <div className="mt-4">
              <TextField
                noLabel
                placeholder="??????"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                disabled={!enabled}
                fullWidth
                size="lg"
                icon={<PlusIcon />}
                variant="primary"
                onClick={handleSubmit}
              >
                ????????????
              </Button>
            </div>
          </>
        ) : (
          <>
            <TextField
              value={postNum}
              placeholder="????????????"
              onChange={(e) => setPostNum(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                handleFetchPost();
              }}
            />
            {post === null && (
              <p className="text-red-600 text-center">??????????????????????????????</p>
            )}
          </>
        )}
      </div>
    </Dialog>
  );
};

export default NewOrderDialog;
