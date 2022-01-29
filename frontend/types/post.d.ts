export interface Post {
  _id: string;
  postNum: number;
  title: string;
  displayName: string;
  userId: string;
  pictureUrl: string;
  imageUrls: ImageUrl[];
  body: string;
  items: Item[];
  createdAt: string;
  deadline: string;
  deliveryDate: string;
  likeCount: number;
  commentCount: number;
  orderCount: number;
  storageType: "roomTemp" | "refrigerated" | "frozen";
  status: "open" | "closed" | "completed" | "canceled";
}

export interface PostCard {
  _id: string;
  postNum: number;
  title: string;
  displayName: string;
  imageUrls: ImageUrl[];
  items: Item[];
  orderCount: number;
}

interface ImageUrl {
  sm: string;
  md: string;
  lg: string;
}
interface Item {
  id: string;
  item: string;
  price: number;
  itemQty: number;
}
