import React from "react";

import Card from "components/Card";

const NormalCardSkeleton = () => {
  return (
    <Card className="animate-pulse shadow mx-2 my-3 cursor-pointer hover:shadow-lg transition-shadow bg-white ring-1 ring-zinc-200 dark:ring-0">
      <div className="grid grid-cols-4">
        <div className="my-auto item col-span-1">
          <div className="h-24 w-full bg-zinc-300 dark:bg-zinc-700" />
        </div>
        <div className="p-2 col-span-3 my-auto">
          <div className="h-3 w-full rounded bg-zinc-300 dark:bg-zinc-700" />
          <div className="h-3 w-4/5 mt-1 rounded bg-zinc-300 dark:bg-zinc-700" />
          <div className="h-3 w-3/5 mt-1 rounded bg-zinc-300 dark:bg-zinc-700" />
          <div className="border-zinc-400 border-b-[1px] pb-1 mt-1" />
          <div className="h-3 w-1/5 mt-1 rounded bg-zinc-300 dark:bg-zinc-700" />
        </div>
      </div>
    </Card>
  );
};

export default NormalCardSkeleton;
