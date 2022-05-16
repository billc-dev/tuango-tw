import { useRouter } from "next/router";
import React from "react";

import EditUser from "./EditUser";
import UserTable from "./UserTable";

const User = () => {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-7xl">
      <UserTable />
      {typeof router.query.edit_user_id === "string" && (
        <EditUser userId={router.query.edit_user_id} />
      )}
    </div>
  );
};

export default User;
