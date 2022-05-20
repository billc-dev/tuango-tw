import React from "react";

import OrderHasNameButton from "components/Button/OrderHasNameButton";
import Checkbox from "components/Checkbox";
import Select from "components/Select";
import TableCell from "components/Table/TableCell";
import TableRow from "components/Table/TableRow";

const OrderActionRow = () => {
  return (
    <TableRow>
      <TableCell>
        <Checkbox checkboxSize="large" />
      </TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell>
        <OrderHasNameButton short hasName={false} />
      </TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell noPadding>
        <Select
          height="normal"
          name="status"
          //   onChange={handleChange}
          options={[
            { label: "已下訂 🦓", value: "ordered" },
            { label: "已到貨 🚚", value: "delivered" },
            { label: "已取消 ❌", value: "canceled" },
          ]}
        />
      </TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
};

export default OrderActionRow;
