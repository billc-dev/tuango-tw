import React from "react";

import { useRouter } from "next/router";

import Completed from "domain/Order/UserOrders/Completed";
import Liked from "domain/Order/UserOrders/Liked";
import NormalOrders from "domain/Order/UserOrders/NormalOrders";

const Status = () => {
  const router = useRouter();
  const renderedComponent = () => {
    switch (router.query.status) {
      case "liked":
        return <Liked />;
      case "completed":
        return <Completed />;
      case "ordered":
      case "delivered":
      case "missing":
      case "canceled":
        return <NormalOrders />;
      default:
        return null;
    }
  };
  return <>{renderedComponent()}</>;
};

export default Status;
