import { NextRouter } from "next/router";

import { UrlObject } from "url";

export const shallowPush = (router: NextRouter, query: UrlObject["query"]) => {
  router.push({ query }, undefined, { shallow: true });
};
