import { useRouter } from "next/router";
import React, { useState } from "react";

import Button from "components/Button";
import CompleteHistory from "domain/Complete/CompleteHistory";
import PickupOrders from "domain/Order/PickupOrders";
import PostDialog from "domain/Post/PostDialog";
import PickupUser from "domain/User/PickupUser";
import { User } from "domain/User/types";

const Pickup = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [user, setUser] = useState<User>();
  const [open, setOpen] = useState(false);
  return (
    <div className="max-w-lg mx-auto mt-2">
      <PickupUser {...{ user, setUser }} />
      {user?.username && (
        <PickupOrders username={user.username} {...{ setUser }} />
      )}
      <Button
        className="my-2"
        fullWidth
        variant="primary"
        onClick={() => setOpen(!open)}
      >
        取貨紀錄
      </Button>
      {open && <CompleteHistory />}
      {typeof postId === "string" && <PostDialog postId={postId} />}
    </div>
  );
};

export default Pickup;
