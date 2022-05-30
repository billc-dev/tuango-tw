import React, { FC, useState } from "react";

import Button from "components/Button";
import PopupDialog from "components/Dialog/PopupDialog";
import Radio from "components/Radio";
import TextField from "components/TextField";
import { User } from "domain/User/types";

import { useCompleteOrders } from "../hooks";
import { getCompletedOrdersSum } from "../services";
import { IOrder } from "../types";

interface Props {
  orders: IOrder[];
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const Payment: FC<Props> = ({ orders, setUser }) => {
  const [payment, setPayment] = useState<number>();
  const [open, setOpen] = useState(false);
  const [linePay, setLinePay] = useState(false);
  const sum = getCompletedOrdersSum(orders);
  const completeOrders = useCompleteOrders(setOpen);
  const handleAdd = (amount: number) => {
    return () => {
      setPayment((payment) => {
        if (payment) return payment + amount;
        return amount;
      });
    };
  };
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    completeOrders.mutate(
      { linePay, orders, sum },
      { onSuccess: () => setUser(undefined) }
    );
  };
  const hasCompletedOrder = () => {
    for (const order of orders) {
      for (const orderItem of order.order) {
        if (orderItem.status === "completed") return true;
      }
    }
    return false;
  };
  return (
    <div>
      {sum > 0 && (
        <div className="mb-4">
          收:
          <TextField
            value={payment}
            className="ml-1"
            variant="standard"
            noLabel
            type="number"
            placeholder="現金"
            onChange={(e) => setPayment(Number(e.target.value))}
          />
          <span>{payment && payment - sum >= 0 && `找$${payment - sum}`} </span>
          <div className="flex mt-4">
            {[1, 5, 10, 50, 100, 500, 1000].map((amount) => (
              <Button
                key={amount}
                className="px-0.5"
                fullWidth
                onClick={handleAdd(amount)}
              >
                +{amount}
              </Button>
            ))}
          </div>
        </div>
      )}
      <Button
        disabled={!hasCompletedOrder()}
        size="lg"
        variant="primary"
        fullWidth
        onClick={() => setOpen(true)}
      >
        合計${sum}
      </Button>
      <PopupDialog
        title="您確定要合計？"
        confirmComponent
        onConfirm={handleSubmit}
        loading={completeOrders.isLoading}
        {...{ open, handleClose }}
      >
        <div>
          <p className="text-lg">付款方式</p>
          <Radio
            radioSize="lg"
            name="linePay"
            label="現金付款"
            checked={!linePay}
            onChange={() => setLinePay(false)}
          />
          <Radio
            radioSize="lg"
            name="linePay"
            label="LINE PAY"
            className="text-line-400 focus:ring-line-400"
            checked={linePay}
            onChange={() => setLinePay(true)}
          />
        </div>
      </PopupDialog>
    </div>
  );
};

export default Payment;
