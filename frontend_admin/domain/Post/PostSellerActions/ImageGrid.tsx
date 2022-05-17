import React, { FC } from "react";

import { TrashIcon } from "@heroicons/react/outline";
import { Control, UseFormGetValues, useFieldArray } from "react-hook-form";

import Button from "components/Button";

import { PostFormSchema } from "../schema";

interface Props {
  getValues: UseFormGetValues<PostFormSchema>;
  control: Control<PostFormSchema, any>;
}

const ImageGrid: FC<Props> = (props) => {
  const { getValues, control } = props;
  const imageUrlsFieldArray = useFieldArray({ control, name: "imageUrls" });
  const imageUrls = getValues("imageUrls");

  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      {imageUrls.map((image, index) => (
        <div className="flex flex-col justify-between" key={index}>
          <select
            className="rounded-lg w-full bg-zinc-100 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-600 mb-2"
            value={index}
            onChange={(e) =>
              imageUrlsFieldArray.swap(index, Number(e.target.value))
            }
          >
            {imageUrls.map((_, index) => (
              <option key={index} value={index}>
                {index + 1}
              </option>
            ))}
          </select>
          <img src={image.md} alt="product" />
          <Button
            className="mt-2"
            fullWidth
            icon={<TrashIcon />}
            onClick={() => imageUrlsFieldArray.remove(index)}
          >
            刪除
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
