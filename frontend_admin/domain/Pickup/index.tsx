import React, { useState } from "react";

import Button from "components/Button";
import PickupOrders from "domain/Order/PickupOrders";
import PickupUser from "domain/User/PickupUser";
import { User } from "domain/User/types";

const Pickup = () => {
  const [user, setUser] = useState<User>();

  return (
    <div className="max-w-lg mx-auto mt-2">
      <PickupUser {...{ user, setUser }} />
      {user?.username && (
        <PickupOrders username={user.username} {...{ setUser }} />
      )}
      <Button className="mt-2" fullWidth variant="primary">
        取貨紀錄
      </Button>
    </div>
  );
};

export default Pickup;
