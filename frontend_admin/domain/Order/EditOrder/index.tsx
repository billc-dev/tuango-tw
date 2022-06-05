import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

import { shallowPush } from "utils";

import Button from "components/Button";
import Dialog from "components/Dialog";
import LoadingIndicator from "components/Indicator/LoadingIndicator";
import { useSubmitting } from "hooks";

import { useOrder } from "../hooks";
import EditOrderForm from "./EditOrderForm";

interface Props {
  orderId: string;
}

const EditOrder: FC<Props> = ({ orderId }) => {
  const router = useRouter();
  const orderQuery = useOrder(orderId);
  const submittingQuery = useSubmitting();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    const { edit_order_id, ...query } = router.query;
    shallowPush(router, query);
  };

  useEffect(() => {
    if (orderQuery.data) setOpen(true);
  }, [orderQuery.data]);

  useEffect(() => {
    return () => orderQuery.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
              variant="primary"
              form="order-form"
              type="submit"
              size="lg"
              loading={submittingQuery.data}
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
