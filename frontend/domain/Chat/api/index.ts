import axios from "axios";

import { ImageUrl } from "domain/Post/types";

import { IMessage, IRoom, MessageType } from "../types";

export const fetchRooms = () => {
  return axios.get<{ rooms: IRoom[]; messageCount: number }>("/rooms/list");
};

export const fetchRoom = (userId: string) => {
  return axios.get<{ room: IRoom; messages: IMessage }>("/rooms/room", {
    params: { userId },
  });
};

export const fetchNewMessages = (params: FetchMessagesParams) => {
  return axios.get<{ messages: IMessage[] }>("/messages/newMessages", {
    params,
  });
};

interface FetchMessagesParams {
  roomId: string;
  createdAt: string;
}

export const fetchMessages = (params: FetchMessagesParams) => {
  return axios.get<{ messages: IMessage[]; hasMore: boolean }>("/messages", {
    params,
  });
};

interface SendMessageParams {
  roomId: string;
  type: MessageType;
  payload: string | ImageUrl;
}

export const sendMessage = (params: SendMessageParams) => {
  return axios.post<{ message: IMessage }>("/messages/message/send", {
    ...params,
  });
};

const imageUploadUrl =
  "https://4tr9p3bu1e.execute-api.ap-east-1.amazonaws.com/prod/upload-image";

export interface UploadImageParams {
  image: unknown;
  filename: string;
  type: "sm" | "md";
}

export const uploadImage = async ({
  image,
  filename,
  type,
}: UploadImageParams) => {
  await axios.put(
    `${imageUploadUrl}?bucket=tuango-tw-images&key=${filename}/${type}.jpeg`,
    image,
    { headers: { "Content-Type": "image/jpeg" }, withCredentials: false }
  );
  return `https://d2lduww19xwizo.cloudfront.net/${filename}/${type}.jpeg`;
};

interface SetReadParams {
  roomId: string;
  createdAt: string;
}

export const setRead = ({ roomId, createdAt }: SetReadParams) => {
  return axios.patch("/messages/message/read", { roomId, createdAt });
};

export const resetNotifications = (roomId: string) => {
  return axios.patch("/rooms/room/notifications/reset", { roomId });
};
