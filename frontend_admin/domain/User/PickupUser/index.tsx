import React, { FC } from "react";

import Button from "components/Button";
import CardHeader from "components/Card/CardHeader";
import TextField from "components/TextField";

import UserQuery from "../UserQuery";
import { useGetUserByPickupNum } from "../hooks";
import { User } from "../types";

interface Props {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const PickupUser: FC<Props> = ({ user, setUser }) => {
  const getUserByPickupNumQuery = useGetUserByPickupNum();

  const handleSetUser = (user: User) => {
    setUser(user);
  };
  const handleGetUserByPickupNum = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key !== "Enter") return;
    const pickupNum = Number(e.currentTarget.value);
    if (pickupNum < 0) return;
    getUserByPickupNumQuery.mutate(pickupNum, {
      onSuccess(data) {
        setUser(data);
      },
    });
  };
  return (
    <div className="mx-2">
      {user ? (
        <div className="mt-4">
          <Button fullWidth onClick={() => setUser(undefined)}>
            已合計
          </Button>
          <CardHeader title={user.displayName} img={user.pictureUrl} />
        </div>
      ) : (
        <div className="flex">
          <TextField
            type="number"
            noLabel
            variant="standard"
            placeholder="會員編號"
            onKeyDown={handleGetUserByPickupNum}
          />
          <UserQuery
            noLabel
            fullWidth
            variant="standard"
            placeholder="名稱"
            setUser={handleSetUser}
          />
        </div>
      )}
    </div>
  );
};

export default PickupUser;
