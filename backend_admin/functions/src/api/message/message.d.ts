export interface IMessage {
  _id: string;
  message: string;
  query: {
    postNum?: number;
    status?: string;
    storageType?: string;
    title?: string;
    displayName?: string;
  };
  sentTo: { _id: string; displayName: string }[];
  createdAt: string;
}
