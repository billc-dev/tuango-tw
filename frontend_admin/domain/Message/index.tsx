import React from "react";

import MessageHistory from "./MessageHistory";
import MessageOrderTable from "./MessageOrderTable";

const Message = () => {
  return (
    <div className="grid grid-cols-3 mx-auto max-w-7xl">
      <MessageHistory />
      <MessageOrderTable />
    </div>
  );
};

export default Message;
