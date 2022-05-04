import { IDeliver } from "../types";

export const getAmounts = (deliver: IDeliver) => {
  const { normalTotal, normalFee, extraTotal, extraFee } = deliver;
  return { normalTotal, normalFee, extraTotal, extraFee };
};
