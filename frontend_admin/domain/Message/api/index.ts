import axios from "axios";

import { IMessage, MessageOrderQuery } from "../types";

interface SendMessageParams {
  userIds: string[];
  message: string;
  query: MessageOrderQuery;
}
export const sendMessage = (params: SendMessageParams) => {
  return axios.post("/notify/message", params);
};

interface MessageResponse {
  messages: IMessage[];
  nextId: string | undefined;
  hasMore: boolean;
}

export const fetchInfiniteMessages = async (cursor: string, limit: number) => {
  const res = await axios.get<MessageResponse>(`/messages/paginate/${cursor}`, {
    params: { limit },
  });
  return {
    messages: res.data.messages,
    nextId: res.data.hasMore ? res.data.nextId : undefined,
  };
};
