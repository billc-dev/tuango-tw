import React, { FC, useEffect, useState } from "react";

import { TruckIcon } from "@heroicons/react/outline";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

import Button from "components/Button";
import TextField from "components/TextField";
import { useDatePosts } from "domain/Post/hooks";
import { getFormattedDate } from "services/date";

import PostsDialog from "./PostsDialog";

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setPostNum: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}

const DeliverQuery: FC<Props> = (props) => {
  const { value, setValue, setPostNum, isLoading } = props;
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(getFormattedDate());
  const [query, setQuery] = useState("");
  const postsQuery = useDatePosts(query);
  const handleSubmit = () => {
    if (!(Number(value) >= 0))
      return toast.error("流水編號有誤！", { id: "postNumError" });
    setPostNum(value);
    queryClient.invalidateQueries("postOrders");
  };
  const handleClose = () => {
    setOpen(false);
    setQuery("");
  };
  useEffect(
    () => (postsQuery.data ? setOpen(true) : setOpen(false)),
    [postsQuery.data]
  );
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex">
          <TextField
            value={value}
            variant="standard"
            noLabel
            placeholder="流水編號"
            onChange={(e) => setValue(e.target.value)}
          />
          <Button type="submit" loading={isLoading}>
            搜尋
          </Button>
        </div>
        <Button
          className="my-2"
          icon={<TruckIcon />}
          fullWidth
          onClick={() => {
            setQuery(getFormattedDate());
            setDate(getFormattedDate());
          }}
        >
          今日到貨
        </Button>
        <div className="flex">
          <TextField
            variant="standard"
            type="date"
            noLabel
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Button loading={postsQuery.isLoading} onClick={() => setQuery(date)}>
            搜尋
          </Button>
        </div>
        {open && query && (
          <PostsDialog {...{ open, handleClose, date: query, setPostNum }} />
        )}
      </form>
    </>
  );
};

export default DeliverQuery;
