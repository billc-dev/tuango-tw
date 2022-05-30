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
        setOrderItems(post.items.map((item) => ({ ...item, qty: "" })));
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
    createOrder.mutate(
      { username, comment, orderItems, postId: post._id },
      {
        onSuccess: () => {
          handleClose();
          handleCloseExtraDialog();
        },
        onError: () => {
          toast.error("訂單新增失敗");
        },
      }
    );
  };

  return (
    <Dialog title="新增訂單" {...{ open, handleClose }}>
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
              重置
            </Button>
            <p>
              #{post.postNum} {post.title} #{post.displayName}
            </p>
            <OrderTable notExtra {...{ orderItems, handleChange }} />
            <div className="mt-4">
              <TextField
                noLabel
                placeholder="備註"
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
                新增訂單
              </Button>
            </div>
          </>
        ) : (
          <>
            <TextField
              value={postNum}
              placeholder="流水編號"
              onChange={(e) => setPostNum(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                handleFetchPost();
              }}
            />
            {post === null && (
              <p className="text-red-600 text-center">沒有此流水編號的貼文</p>
            )}
          </>
        )}
      </div>
    </Dialog>
  );
};

export default NewOrderDialog;
