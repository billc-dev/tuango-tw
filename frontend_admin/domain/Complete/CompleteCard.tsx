import { useRouter } from "next/router";
import React, { FC, useState } from "react";

import { shallowPush } from "utils";

import Button from "components/Button";
import Checkbox from "components/Checkbox";
import PopupDialog from "components/Dialog/PopupDialog";
import { copyToClipboard } from "services";
import { getFullDateFromNow } from "services/date";

import { useChangePaymentMethod, useConfirmPayment } from "./hooks";
import { shorternAdminName } from "./services";
import { IComplete } from "./types";

interface Props {
  complete: IComplete;
}

const CompleteCard: FC<Props> = (props) => {
  const router = useRouter();
  const [complete, setComplete] = useState(props.complete);
  const { displayName, admin, payment, createdAt } = complete;
  const [open, setOpen] = useState(false);
  const changePaymentMethod = useChangePaymentMethod();
  const confirmPayment = useConfirmPayment();
  const handleClose = () => setOpen(false);
  const handleConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    confirmPayment.mutate(
      {
        completeId: complete._id,
        confirmed: e.target.checked,
      },
      {
        onSuccess: (complete) => {
          setComplete(complete);
        },
      }
    );
  };
  const handleChangePaymentMethod = () => {
    changePaymentMethod.mutate(
      {
        completeId: complete._id,
        linePay: !payment.linePay,
      },
      {
        onSuccess: (complete) => {
          setOpen(false);
          setComplete(complete);
        },
      }
    );
  };
  return (
    <div className="mt-4 first:mt-2">
      <div className="flex items-center">
        <Button onClick={() => copyToClipboard(displayName, "名稱")}>
          <p className="line-clamp-1">{displayName}</p>
        </Button>
        <p className="line-clamp-1 ml-2">取貨員: {shorternAdminName(admin)}</p>
      </div>
      {payment.linePay ? (
        <div className="mt-2 flex items-center">
          <Button variant="primary" onClick={() => setOpen(true)}>
            LINE PAY
          </Button>
          <label className="flex items-center ml-2">
            <Checkbox
              checkboxSize="large"
              checked={payment.confirmed}
              className="text-line-400 focus:ring-line-400"
              onChange={handleConfirm}
            />
            <p className="ml-2">已核對</p>
          </label>
        </div>
      ) : (
        <div className="mt-2">
          <Button onClick={() => setOpen(true)}>現金付款</Button>
        </div>
      )}
      <p className="text-sm mt-1">{getFullDateFromNow(createdAt)}</p>
      {open && (
        <PopupDialog
          title={`您確定要更改的付款方式嗎？`}
          confirmComponent
          onConfirm={handleChangePaymentMethod}
          loading={changePaymentMethod.isLoading}
          {...{ open, handleClose }}
        >
          {displayName}改成{payment.linePay ? "現金付款" : "LINE PAY"}
        </PopupDialog>
      )}
      {complete.orders.map((order) => (
        <div
          key={order.orderId}
          className="text-sm pt-1 cursor-pointer"
          onClick={() =>
            shallowPush(router, { ...router.query, postId: order.postId })
          }
        >
          🛒 #{order.postNum} {order.title} #{order.sellerDisplayName}
          {order.order.map((orderItem, index) => (
            <p key={index} className="text-zinc-500">
              {orderItem.id}. {orderItem.item} +{orderItem.qty} $
              {orderItem.price * orderItem.qty}
              {orderItem.location && `📍${orderItem.location}`}
            </p>
          ))}
        </div>
      ))}
      <Button
        className="mt-2"
        fullWidth
        onClick={() => {
          copyToClipboard(
            `合計$${complete.total} 取貨記錄連結: www.開心團購.com/completed/${complete._id}`,
            "取貨記錄連結"
          );
        }}
      >
        合計${complete.total}
      </Button>
    </div>
  );
};

export default CompleteCard;
