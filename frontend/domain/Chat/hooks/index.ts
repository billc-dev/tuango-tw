import { AxiosResponse } from "axios";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

import { useIsAuthenticated } from "domain/User/hooks";

import {
  fetchMessages,
  fetchNewMessages,
  fetchRoom,
  fetchRooms,
  resetNotifications,
  sendMessage,
  setRead,
  uploadImage,
} from "../api";
import { IMessage } from "../types";

export const useRooms = () => {
  const isAuthenticated = useIsAuthenticated();
  return useQuery(["rooms"], fetchRooms, {
    enabled: isAuthenticated,
    refetchInterval: 10000,
  });
};

export const useRoom = (userId: string) => {
  const isAuthenticated = useIsAuthenticated();
  return useQuery(["room", userId], () => fetchRoom(userId), {
    enabled: isAuthenticated,
  });
};

export const useMessagesCreatedAt = () => {
  return useQuery("messagesCreatedAt", () => new Date().toISOString(), {
    staleTime: Infinity,
    initialData: () => new Date().toISOString(),
  });
};

export const useNewMessages = (roomId: string) => {
  const { data: createdAt } = useMessagesCreatedAt();
  return useQuery(
    ["newMessages", roomId],
    () => fetchNewMessages({ roomId, createdAt: createdAt || "" }),
    { enabled: !!createdAt, refetchInterval: 5000 }
  );
};

export const useInfiniteMessages = (roomId: string) => {
  const { data } = useMessagesCreatedAt();
  return useInfiniteQuery(
    ["messages", roomId],
    ({ pageParam = data }) => fetchMessages({ roomId, createdAt: pageParam }),
    {
      enabled: !!data,
      refetchInterval: 5000,
      getPreviousPageParam: (lastPage) =>
        lastPage.data.hasMore ? lastPage.data.messages[0].createdAt : undefined,
    }
  );
};

type NewMessages = AxiosResponse<{ messages: IMessage[] }, any> | undefined;

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation(sendMessage, {
    onMutate: () => {
      queryClient.setQueryData("isSendingMessage", true);
    },
    onSuccess: ({ data: { message } }, { roomId }) => {
      const messageQuery = queryClient.getQueryData<NewMessages>([
        "newMessages",
        roomId,
      ]);

      if (!messageQuery) return;
      queryClient.setQueryData(["newMessages", roomId], {
        ...messageQuery,
        data: {
          ...messageQuery.data,
          messages: [...messageQuery.data.messages, message],
        },
      });

      queryClient.invalidateQueries(["newMessages", roomId]);
    },
    onSettled: () => {
      queryClient.setQueryData("isSendingMessage", false);
    },
  });
};

export const useUploadImage = () => {
  const queryClient = useQueryClient();
  return useMutation(uploadImage, {
    onMutate: () => {
      queryClient.setQueryData("isSendingMessage", true);
    },
  });
};

export const useIsSendingMessage = () => {
  return useQuery("isSendingMessage", () => false, { staleTime: Infinity });
};

export const useSetRead = () => {
  const queryClient = useQueryClient();
  return useMutation(setRead, {
    onSuccess: (_, { roomId }) => {
      queryClient.invalidateQueries(["messages", roomId]);
      queryClient.invalidateQueries(["newMessages", roomId]);
    },
  });
};

export const useResetRoomNotifications = () => {
  const queryClient = useQueryClient();
  return useMutation(resetNotifications, {
    onSuccess: () => {
      queryClient.invalidateQueries(["rooms"]);
    },
  });
};

export const useUnsentMessage = () => {
  const queryClient = useQueryClient();
  return useQuery(
    "unsentMessage",
    (): IMessage[] => {
      const unsentMessage =
        queryClient.getQueryData<IMessage[]>("unsentMessage");
      if (unsentMessage) return unsentMessage;
      return [];
    },
    { staleTime: Infinity }
  );
};
