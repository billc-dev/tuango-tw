import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

import { DocumentAddIcon } from "@heroicons/react/outline";
import { shallowPush } from "utils";

import Button from "components/Button";
import Dialog from "components/Dialog";
import LoadingIndicator from "components/Indicator/LoadingIndicator";

import { useOrder } from "../hooks";
import EditOrderForm from "./EditOrderForm";

interface Props {
  orderId: string;
}

const EditOrder: FC<Props> = ({ orderId }) => {
  const router = useRouter();
  const orderQuery = useOrder(orderId);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    const { edit_order_id, ...query } = router.query;
    shallowPush(router, query);
  };

  useEffect(() => {
    if (orderQuery.data) setOpen(true);
  }, [orderQuery.data]);
  return (
    <>
      <LoadingIndicator loading={orderQuery.isLoading} />
      <Dialog
        {...{
          handleClose,
          open,
          title: "編輯訂單",
          action: (
            <Button
              icon={<DocumentAddIcon />}
              variant="primary"
              form="order-form"
              type="submit"
              size="lg"
            >
              編輯訂單
            </Button>
          ),
        }}
      >
        {orderQuery.data && (
          <EditOrderForm order={orderQuery.data} {...{ handleClose }} />
        )}
      </Dialog>
    </>
  );
};

export default EditOrder;
