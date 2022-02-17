import { Item } from "../types";

export function getProductPriceRange(items: Item[]) {
  let price;

  if (items.length > 1) {
    const min = items.reduce(
      (min, item) => Math.min(min, item.price),
      items[0].price
    );
    const max = items.reduce(
      (min, item) => Math.max(min, item.price),
      items[0].price
    );
    if (min === max) price = items[0].price;
    else price = `${min}~$${max}`;
  } else price = items[0].price;

  return price;
}
