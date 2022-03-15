import React, { FC } from "react";

import { UseFormRegister } from "react-hook-form";

import Select from "components/Select";

import { PostForm } from "../schema";

interface Props {
  register: UseFormRegister<PostForm>;
}

const options = [
  { value: "roomTemp", label: "常溫" },
  { value: "refrigerated", label: "冷藏" },
  { value: "frozen", label: "冷凍" },
];

const StorageTypeSelect: FC<Props> = ({ register }) => {
  return <Select {...{ options }} {...register("storageType")} />;
};

export default StorageTypeSelect;
