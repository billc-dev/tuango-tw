import axios from "axios";

import { IDeliver } from "../types";

export const fetchPostDelivers = async (postId: string) => {
  const res = await axios.get<{ delivers: IDeliver[] }>(
    `/delivers/post/${postId}`
  );
  return res.data.delivers;
};

interface PatchDeliverAmountParams {
  deliverId: string;
  amount: {
    normalTotal: number;
    normalFee: number;
    extraTotal: number;
    extraFee: number;
  };
}

export const patchDeliverAmount = async ({
  deliverId,
  amount,
}: PatchDeliverAmountParams) => {
  const res = await axios.patch<{ deliver: IDeliver }>(
    `/delivers/${deliverId}`,
    amount
  );
  return res.data.deliver;
};
