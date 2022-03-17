import React, { FC } from "react";

import { PlusIcon, TrashIcon } from "@heroicons/react/outline";
import {
  Control,
  FormState,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";

import Button from "components/Button";
import TextField from "components/TextField";
import { indexAlphabet } from "utils/constants";

import { PostFormSchema } from "../schema";

interface Props {
  control: Control<PostFormSchema, any>;
  register: UseFormRegister<PostFormSchema>;
  errors: FormState<PostFormSchema>["errors"];
}

const PostItems: FC<Props> = (props) => {
  const { control, errors, register } = props;
  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  return (
    <>
      {fields.map((item, index) => (
        <div key={item.id}>
          <TextField
            label={`${indexAlphabet[index]}.`}
            color="grey"
            placeholder="商品名稱"
            error={errors.items?.[index]?.item?.message}
            key={`items.${index}.item`}
            {...register(`items.${index}.item`)}
          />
          <TextField
            color="grey"
            selectOnFocus
            placeholder="價格"
            key={`items.${index}.price`}
            error={errors.items?.[index]?.price?.message}
            {...register(`items.${index}.price`)}
          />
          <TextField
            color="grey"
            selectOnFocus
            placeholder="數量"
            key={`items.${index}.itemQty`}
            error={errors.items?.[index]?.itemQty?.message}
            {...register(`items.${index}.itemQty`)}
          />
          {!item._id && fields.length > 1 ? (
            <Button icon={<TrashIcon />} onClick={() => remove(index)}>
              刪除
            </Button>
          ) : null}
        </div>
      ))}
      <Button
        className="mt-2"
        fullWidth
        icon={<PlusIcon />}
        onClick={() => append({ item: "", price: undefined, itemQty: 100 })}
      >
        新增商品
      </Button>
    </>
  );
};

export default PostItems;
