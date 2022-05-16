import { useRouter } from "next/router";
import React from "react";

import CompletedCard from "domain/Order/UserOrders/CompletedCard";
import { useComplete } from "domain/Order/hooks";

const ID = () => {
  const router = useRouter();
  const completeQuery = useComplete(router.query.id as string);
  if (!completeQuery.data) return null;
  return (
    <>
      <p>{completeQuery.data.displayName}</p>
      <CompletedCard complete={completeQuery.data} />
    </>
  );
};

export default ID;
