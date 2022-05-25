import React, { FC, useState } from "react";

import Button from "components/Button";

import NewOrderDialog from "./NewOrderDialog";

interface Props {
  username: string;
  handleClose: () => void;
}
const NewOrder: FC<Props> = ({ username, ...props }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button fullWidth onClick={() => setOpen(true)}>
        新增無待認購訂單
      </Button>
      {open && (
        <NewOrderDialog
          {...{
            username,
            open,
            handleClose,
            handleCloseExtraDialog: props.handleClose,
          }}
        />
      )}
    </div>
  );
};

export default NewOrder;
