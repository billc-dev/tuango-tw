import React, { FC } from "react";

import { UseFormRegister } from "react-hook-form";

import Select from "components/Select";

import { PostFormSchema } from "../schema";
import { storageTypeOptions } from "../services";

interface Props {
  register: UseFormRegister<PostFormSchema>;
}

const StorageTypeSelect: FC<Props> = ({ register }) => {
  return (
    <>
      <p className="pb-2">儲存方式</p>
      <Select options={storageTypeOptions} {...register("storageType")} />
    </>
  );
};

export default StorageTypeSelect;
