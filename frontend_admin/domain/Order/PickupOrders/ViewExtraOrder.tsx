import React, { FC, useState } from "react";

import { RefreshIcon, SearchIcon } from "@heroicons/react/outline";

import Button from "components/Button";
import IconButton from "components/Button/IconButton";
import Dialog from "components/Dialog";
import TextField from "components/TextField";

import { useExtraOrders } from "../hooks";
import { ExtraOrdersQuery, IOrder } from "../types";
import CreateOrderDialog from "./CreateOrderDialog";
import ExtraOrderCard from "./ExtraOrderCard";
import NewOrder from "./NewOrder";

interface Props {
  username: string;
  open: boolean;
  handleClose: () => void;
}
const ViewExtraOrder: FC<Props> = ({ username, open, handleClose }) => {
  const [values, setValues] = useState<ExtraOrdersQuery>({});
  const [query, setQuery] = useState<ExtraOrdersQuery>({});
  const [order, setOrder] = useState<IOrder>();
  const extraOrdersQuery = useExtraOrders(query);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((query) => ({ ...query, [name]: value }));
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    handleSubmit();
  };
  const handleSubmit = () => setQuery({ ...values });
  return (
    <Dialog {...{ title: "新增訂單", open, handleClose }}>
      <div className="mt-2">
        <NewOrder {...{ username, handleClose }} />
        <div className="flex mt-4">
          <TextField
            name="text"
            value={values.text}
            noLabel
            variant="standard"
            placeholder="關鍵字"
            className="w-5/12"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <TextField
            name="postNum"
            value={values.postNum}
            noLabel
            variant="standard"
            placeholder="流水編號"
            className="w-5/12"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <IconButton
            onClick={() => {
              setQuery({});
              setValues({ text: "", postNum: undefined });
            }}
          >
            <RefreshIcon />
          </IconButton>
        </div>
        <Button
          fullWidth
          variant="primary"
          icon={<SearchIcon />}
          onClick={handleSubmit}
        >
          搜尋
        </Button>
        <div className="mt-2">
          {extraOrdersQuery.data?.map((order) => (
            <ExtraOrderCard key={order._id} {...{ order, setOrder }} />
          ))}
        </div>
      </div>
      {order && (
        <CreateOrderDialog
          open={!!order}
          handleClose={() => setOrder(undefined)}
          {...{ order, username, handleCloseExtraDialog: handleClose }}
        />
      )}
    </Dialog>
  );
};

export default ViewExtraOrder;
