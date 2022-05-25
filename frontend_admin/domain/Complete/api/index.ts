import axios from "axios";

import { CompleteQuery, IComplete } from "../types";

interface CompleteResponse {
  completes: IComplete[];
  nextId: string | undefined;
  hasMore: boolean;
}

export const fetchCompletes = async (
  cursor: string,
  limit: number,
  query?: CompleteQuery
) => {
  const res = await axios.get<CompleteResponse>(
    `/completes/paginate/${cursor}`,
    { params: { limit, query } }
  );

  return {
    completes: res.data.completes,
    nextId: res.data.hasMore ? res.data.nextId : undefined,
  };
};

interface ChangePaymentMethodParams {
  completeId: string;
  linePay: boolean;
}

export const changePaymentMethod = async ({
  completeId,
  linePay,
}: ChangePaymentMethodParams) => {
  const res = await axios.patch<{ complete: IComplete }>(
    `/completes/paymentMethod/${completeId}`,
    { linePay }
  );
  return res.data.complete;
};

interface ConfirmPaymentParams {
  completeId: string;
  confirmed: boolean;
}

export const confirmPayment = async ({
  completeId,
  confirmed,
}: ConfirmPaymentParams) => {
  const res = await axios.patch<{ complete: IComplete }>(
    `/completes/confirmPayment/${completeId}`,
    { confirmed }
  );
  return res.data.complete;
};
