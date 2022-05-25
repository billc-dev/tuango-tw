import React, { FC } from "react";

import Checkbox from "components/Checkbox";
import { getPostTitle } from "domain/Post/services";
import { getFullDateFromNow } from "services/date";

import TotalItemsTable from "../DeliverTable/TotalItemsTable";
import { useDeliverHistorySum } from "../hooks";
import { IDeliver } from "../types";

interface Props {
  deliver: IDeliver;
  checkedDelivers: IDeliver[];
  setCheckedDelivers: React.Dispatch<React.SetStateAction<IDeliver[]>>;
}

const DeliverCard: FC<Props> = (props) => {
  const { deliver, checkedDelivers, setCheckedDelivers } = props;
  const sum = useDeliverHistorySum(deliver);
  const checked = checkedDelivers.find((d) => d._id === deliver._id);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked)
      setCheckedDelivers((checkedDelivers) => [...checkedDelivers, deliver]);
    else
      setCheckedDelivers((checkedDelivers) =>
        checkedDelivers.filter((d) => d._id !== deliver._id)
      );
  };
  return (
    <div className="my-2">
      <p>
        <Checkbox
          checkboxSize="large"
          className="mr-2"
          checked={!!checked}
          onChange={handleChange}
        />
        {getPostTitle(deliver)}
      </p>
      <p className="text-sm">{getFullDateFromNow(deliver.createdAt)}</p>
      <TotalItemsTable {...{ sum }} />
    </div>
  );
};

export default DeliverCard;
