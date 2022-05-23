import React, { FC, useState } from "react";

import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

import Button from "components/Button";
import TextField from "components/TextField";

interface Props {
  setPostNum: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}

const DeliverQuery: FC<Props> = ({ setPostNum, isLoading }) => {
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");
  const handleSubmit = () => {
    if (!(Number(value) >= 0))
      return toast.error("流水編號有誤！", { id: "postNumError" });
    setPostNum(value);
    queryClient.invalidateQueries("postOrders");
  };
  return (
    <>
      <form
        className="flex"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
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
      </form>
    </>
  );
};

export default DeliverQuery;
