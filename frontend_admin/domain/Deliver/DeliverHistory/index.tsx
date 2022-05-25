import React from "react";

import Button from "components/Button";

import DeliverHistoryList from "./DeliverHistoryList";

const DeliverHistory = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="my-2 -ml-1">
      <Button variant="primary" fullWidth onClick={() => setOpen(!open)}>
        進貨紀錄
      </Button>
      {open && <DeliverHistoryList />}
    </div>
  );
};

export default DeliverHistory;
