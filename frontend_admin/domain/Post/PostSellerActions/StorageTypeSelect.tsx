import React, { FC } from "react";

import { UseFormRegister } from "react-hook-form";

import Select from "components/Select";

import { PostFormSchema } from "../schema";

interface Props {
  register: UseFormRegister<PostFormSchema>;
}

const options = [
  { value: "roomTemp", label: "常溫" },
  { value: "refrigerated", label: "冷藏" },
  { value: "frozen", label: "冷凍" },
];

const StorageTypeSelect: FC<Props> = ({ register }) => {
  return (
    <>
      <p className="pb-2">儲存方式</p>
      <Select
        height="tall"
        variant="contained"
        {...{ options }}
        {...register("storageType")}
      />
    </>
  );
};

export default StorageTypeSelect;
