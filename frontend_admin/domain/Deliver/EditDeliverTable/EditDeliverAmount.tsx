import React, { FC, useState } from "react";

import mexp from "math-expression-evaluator";
import toast from "react-hot-toast";

import Button from "components/Button";
import TextField from "components/TextField";

import { useEditDeliverAmount } from "../hooks";
import { getAmounts } from "../services";
import { IDeliver } from "../types";

interface Props {
  deliver: IDeliver;
  handleClose: () => void;
}

const EditDeliverAmount: FC<Props> = (props) => {
  const { handleClose } = props;
  const [deliver, setDeliver] = useState(getAmounts(props.deliver));
  const editDeliverAmount = useEditDeliverAmount();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliver((deliver) => ({ ...deliver, [e.target.name]: e.target.value }));
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const { name } = e.currentTarget;
    if (
      name === "normalTotal" ||
      name === "normalFee" ||
      name === "extraTotal" ||
      name === "extraFee"
    ) {
      try {
        const value = mexp.eval(deliver[name].toString());
        setDeliver((deliver) => ({ ...deliver, [name]: Number(value) }));
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name } = e.target;
    if (
      name === "normalTotal" ||
      name === "normalFee" ||
      name === "extraTotal" ||
      name === "extraFee"
    ) {
      try {
        const value = mexp.eval(deliver[name].toString());
        setDeliver((deliver) => ({ ...deliver, [name]: Number(value) }));
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };
  const handleSubmit = () => {
    try {
      const validatedAmounts = {
        normalTotal: Number(mexp.eval(deliver.normalTotal.toString())),
        normalFee: Number(mexp.eval(deliver.normalFee.toString())),
        extraTotal: Number(mexp.eval(deliver.extraTotal.toString())),
        extraFee: Number(mexp.eval(deliver.extraFee.toString())),
      };
      editDeliverAmount.mutate(
        {
          deliverId: props.deliver._id,
          amount: validatedAmounts,
        },
        {
          onSuccess() {
            handleClose();
          },
        }
      );
    } catch (error: any) {
      toast.error(error.message);
      return;
    }
  };
  return (
    <>
      <div className="grid grid-cols-2 gap-x-4">
        <div>
          <TextField
            name="normalTotal"
            variant="standard"
            className="w-full"
            placeholder="金額"
            value={deliver.normalTotal}
            onChange={handleChange}
            onKeyDown={handleEnter}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <TextField
            name="normalFee"
            variant="standard"
            className="w-full"
            placeholder="服務費"
            value={deliver.normalFee}
            onChange={handleChange}
            onKeyDown={handleEnter}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <TextField
            name="extraTotal"
            variant="standard"
            className="w-full"
            placeholder="認購金額"
            value={deliver.extraTotal}
            onChange={handleChange}
            onKeyDown={handleEnter}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <TextField
            name="extraFee"
            variant="standard"
            className="w-full"
            placeholder="認購服務費"
            value={deliver.extraFee}
            onChange={handleChange}
            onKeyDown={handleEnter}
            onBlur={handleBlur}
          />
        </div>
      </div>
      <div className="flex mt-2">
        <Button
          loading={editDeliverAmount.isLoading}
          variant="primary"
          onClick={() => handleSubmit()}
        >
          儲存
        </Button>
        <Button className="ml-2" onClick={() => handleClose()}>
          取消
        </Button>
      </div>
    </>
  );
};

export default EditDeliverAmount;
