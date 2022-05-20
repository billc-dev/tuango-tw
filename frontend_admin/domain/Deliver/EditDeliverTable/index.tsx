import React, { FC, useState } from "react";

import { PencilIcon } from "@heroicons/react/outline";

import IconButton from "components/Button/IconButton";
import Table from "components/Table/Table";
import TableBody from "components/Table/TableBody";
import { getFullLengthDate } from "services/date";
import { getPercentage } from "services/math";

import { IDeliver } from "../types";
import DeliverHead from "./DeliverHead";
import DeliverItems from "./DeliverItems";
import EditDeliverAmount from "./EditDeliverAmount";

interface Props {
  deliver: IDeliver;
}

const DeliverTable: FC<Props> = ({ deliver }) => {
  const [open, setOpen] = useState(false);
  const { normalOrders, normalTotal, normalFee, createdAt } = deliver;
  const { extraOrders, extraTotal, extraFee } = deliver;
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="mt-2">
      <p className="font-medium">{getFullLengthDate(createdAt)}</p>
      {normalOrders && normalTotal > 0 && (
        <Table>
          <DeliverHead />
          <TableBody>
            <DeliverItems orders={normalOrders} />
          </TableBody>
        </Table>
      )}
      {extraOrders && extraTotal > 0 && (
        <>
          <p className="mt-2 font-medium">待認購</p>
          <Table>
            <DeliverHead />
            <TableBody>
              <DeliverItems orders={extraOrders} />
            </TableBody>
          </Table>
        </>
      )}
      {open ? (
        <EditDeliverAmount {...{ deliver, handleClose }} />
      ) : (
        <div className="flex">
          <div>
            <p>
              金額: ${normalTotal} 服務費: ${normalFee} 毛利率:{" "}
              {getPercentage(normalFee, normalTotal)}
            </p>
            <p>
              認購金額: ${extraTotal} 認購服務費: ${extraFee} 毛利率:{" "}
              {getPercentage(extraFee, extraTotal)}
            </p>
          </div>
          <div className="flex items-center">
            <IconButton onClick={() => setOpen(true)}>
              <PencilIcon />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliverTable;
