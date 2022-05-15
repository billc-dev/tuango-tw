import React, { FC } from "react";

import Button from "components/Button";
import CardHeader from "components/Card/CardHeader";
import LoadingIndicator from "components/Indicator/LoadingIndicator";
import TextField from "components/TextField";

import UserQuery from "../UserQuery";
import { useGetUserByPickupNum, useSetLinePay } from "../hooks";
import { User } from "../types";

interface Props {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const PickupUser: FC<Props> = ({ user, setUser }) => {
  const getUserByPickupNumQuery = useGetUserByPickupNum();
  const setLinePay = useSetLinePay();
  const handleSetUser = (user: User) => {
    setUser(user);
  };
  const handleGetUserByPickupNum = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    alert(e.key);
    if (e.key !== "Enter") return;
    const pickupNum = Number(e.currentTarget.value);
    if (pickupNum < 0) return;
    getUserByPickupNumQuery.mutate(pickupNum, {
      onSuccess(data) {
        setUser(data);
      },
    });
  };
  const handlePaymentMethod = () => {
    if (!user) return;
    setLinePay.mutate(
      { username: user.username, linepay: !user.linepay },
      {
        onSuccess(data) {
          setUser(data);
        },
      }
    );
  };
  return (
    <div>
      {user ? (
        <div className="mt-4">
          <Button fullWidth onClick={() => setUser(undefined)}>
            已合計
          </Button>
          <CardHeader
            title={`${user.pickupNum}.${user.displayName}`}
            img={user.pictureUrl}
            action={
              <Button
                loading={setLinePay.isLoading}
                className="whitespace-nowrap"
                variant={user.linepay ? "primary" : undefined}
                onClick={handlePaymentMethod}
              >
                {user.linepay ? "LINE PAY" : "現金付款"}
              </Button>
            }
          />
        </div>
      ) : (
        <div className="flex">
          <form onSubmit={(e) => e.preventDefault()}>
            <TextField
              type="number"
              noLabel
              variant="standard"
              placeholder="會員編號"
              onKeyDown={handleGetUserByPickupNum}
            />
          </form>
          <UserQuery
            noLabel
            fullWidth
            variant="standard"
            placeholder="名稱"
            setUser={handleSetUser}
          />
        </div>
      )}
      <LoadingIndicator loading={getUserByPickupNumQuery.isLoading} />
    </div>
  );
};

export default PickupUser;
