import { posts } from "domain/Post/mock";

import { items, orders } from "../mock";
import { calcSumOrders, getOrderSum } from "../services";

describe("getOrderSum", () => {
  test("should return 0 if no items in array", () => {
    expect(getOrderSum([])).toEqual(0);
  });
  test("should return 0 if undefined", () => {
    expect(getOrderSum()).toEqual(0);
  });
  test("should sum up items", () => {
    expect(getOrderSum([items[0]])).toEqual(105);
    expect(getOrderSum(items)).toEqual(210);
  });
});

describe("calcSumOrders", () => {
  test("should return empty array if no orders", () => {
    expect(calcSumOrders(posts[0], [])).toEqual([]);
  });
  test("should return items array", () => {
    expect(calcSumOrders(posts[0], orders)).toEqual([
      {
        amount: 105,
        id: "A",
        item: "夜釣小卷",
        qty: 1,
      },
      {
        amount: 280,
        id: "B",
        item: "豬肚四神湯",
        qty: 2,
      },
    ]);
  });
});
