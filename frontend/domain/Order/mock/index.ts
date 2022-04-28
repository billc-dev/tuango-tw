import { IOrder } from "../types";

export const items = [
  {
    id: "A",
    item: "青花椰菜",
    price: 35,
    qty: 3,
    itemQty: 10,
  },
  {
    id: "B",
    item: "白花椰菜",
    price: 35,
    qty: 1,
    itemQty: 10,
  },
  {
    id: "D",
    item: "初秋高麗菜",
    price: 35,
    qty: 2,
    itemQty: 10,
  },
];

export const orders: IOrder[] = [
  {
    _id: "62502e7e41691402ddd9f685",
    hasName: false,
    isExtra: false,
    orderHistory: [
      {
        status: "ordered",
        createdAt: "2022-04-08T12:45:50.768Z",
      },
    ],
    status: "ordered",
    orderNum: 11,
    userId: "Ud55ccb85b99925fbfc7c38fc27b05ca0",
    displayName: "莊曉娟",
    sellerDisplayName: "王美娜",
    postNum: 21400,
    title: "夜釣小卷&好喝四神湯",
    pictureUrl:
      "https://profile.line-scdn.net/0h1aPrfxhdbk5tC0Q0xW4RGVFOYCMaJWgGFWlxLUoLNXtJOSoeUmhyL0BZYnhGaS8ZUm8jLEpZMSoX/small",
    postId: "624fa5461a282fa73f1f911d",
    imageUrl:
      "https://d2lduww19xwizo.cloudfront.net/5fefb4739fbc8c6bdf5bc817/KkMwyhGAHRrYlSQVizBVb/sm.jpeg",
    order: [
      {
        location: "",
        hasName: false,

        id: "B",
        item: "豬肚四神湯",
        price: 140,
        qty: 1,
        status: "ordered",
      },
    ],
    comment: "",
    createdAt: "2022-04-08T12:45:50.768Z",
  },
  {
    _id: "624fac831a282fe6471f9126",

    hasName: false,
    isExtra: false,
    orderHistory: [
      {
        status: "ordered",
        createdAt: "2022-04-08T03:31:15.421Z",
      },
    ],
    status: "ordered",
    orderNum: 3,
    userId: "U40cfbdda071bdd8833788f2b5b6c0c3c",
    displayName: "Rubibi kuo",
    sellerDisplayName: "王美娜",
    postNum: 21400,
    title: "夜釣小卷&好喝四神湯",
    pictureUrl:
      "https://profile.line-scdn.net/0hq-_nWrtvLgJiFzmlO9lRVV5SIG8VOShKGnlobEdFIGcYI2BWWiE0ZEUTIzMfdz4GV3BpN0VEJzZM/small",
    postId: "624fa5461a282fa73f1f911d",
    imageUrl:
      "https://d2lduww19xwizo.cloudfront.net/5fefb4739fbc8c6bdf5bc817/KkMwyhGAHRrYlSQVizBVb/sm.jpeg",
    order: [
      {
        location: "",
        hasName: false,

        id: "A",
        item: "夜釣小卷",
        price: 105,
        qty: 1,
        status: "ordered",
      },
      {
        location: "",
        hasName: false,
        id: "B",
        item: "豬肚四神湯",
        price: 140,
        qty: 1,
        status: "ordered",
      },
    ],
    comment: "",
    createdAt: "2022-04-08T03:31:15.421Z",
  },
];
