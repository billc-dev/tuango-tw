import React, { FC, useState } from "react";

import { PlusIcon } from "@heroicons/react/outline";

import Button from "components/Button";

import ViewExtraOrder from "./ViewExtraOrder";

interface Props {
  username: string;
}

const CreateOrder: FC<Props> = ({ username }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="my-4">
      <Button icon={<PlusIcon />} fullWidth onClick={() => setOpen(true)}>
        新增訂單
      </Button>
      {open && <ViewExtraOrder {...{ username, open, handleClose }} />}
    </div>
  );
};

export default CreateOrder;
