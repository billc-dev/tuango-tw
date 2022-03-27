import React from "react";

import Card from "components/Card";

const ExtraCardSkeleton = () => {
  return (
    <Card className="pr-2 grid grid-cols-3 gap-2 shadow-lg bg-white ring-1 ring-zinc-200 dark:ring-0 animate-pulse">
      <div className="col-span-1">
        <div className="h-28 w-full bg-zinc-300 dark:bg-zinc-700" />
      </div>
      <div className="col-span-2 my-auto">
        <div className="h-3 w-full rounded bg-zinc-300 dark:bg-zinc-700" />
        <div className="h-3 w-4/5 mt-2 rounded bg-zinc-300 dark:bg-zinc-700" />
        <div className="h-3 w-3/5 mt-2 rounded bg-zinc-300 dark:bg-zinc-700" />
        <div className="h-8 w-full mt-2 rounded-md bg-zinc-300 dark:bg-zinc-700" />
      </div>
    </Card>
  );
};

export default ExtraCardSkeleton;
