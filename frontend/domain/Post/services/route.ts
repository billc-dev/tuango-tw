import { NextRouter } from "next/router";

import { Action } from "../types";

export const setAction = (action: Action, router: NextRouter) => {
  router.push({ query: { ...router.query, action } }, undefined, {
    shallow: true,
  });
};
