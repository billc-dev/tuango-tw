import React, { FC, useState } from "react";

import Button from "components/Button";
import TextField from "components/TextField";

import { getCompletedOrdersSum } from "../services";
import { IOrder } from "../types";

interface Props {
  orders: IOrder[];
}

const Payment: FC<Props> = ({ orders }) => {
  const [payment, setPayment] = useState<number>();
  const sum = getCompletedOrdersSum(orders);
  const handleAdd = (amount: number) => {
    return () => {
      setPayment((payment) => {
        if (payment) return payment + amount;
        return amount;
      });
    };
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
            <Button fullWidth onClick={handleAdd(1)}>
              +1
            </Button>
            <Button fullWidth onClick={handleAdd(5)}>
              +5
            </Button>
            <Button fullWidth onClick={handleAdd(10)}>
              +10
            </Button>
            <Button fullWidth onClick={handleAdd(50)}>
              +50
            </Button>
            <Button fullWidth onClick={handleAdd(100)}>
              +100
            </Button>
            <Button fullWidth onClick={handleAdd(500)}>
              +500
            </Button>
            <Button fullWidth onClick={handleAdd(1000)}>
              +1000
            </Button>
          </div>
        </div>
      )}
      <Button size="lg" variant="primary" fullWidth>
        合計${sum}
      </Button>
    </div>
  );
};

export default Payment;
