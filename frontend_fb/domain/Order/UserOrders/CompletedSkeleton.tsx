import React from "react";

import Card from "components/Card";

const CompletedSkeleton = () => {
  return (
    <Card className="animate-pulse shadow mx-2 my-3 px-4 py-2 bg-white ring-1 ring-zinc-200 dark:ring-0">
      <div className="h-5 w-4/6 rounded bg-zinc-300 dark:bg-zinc-700" />
      <div className="border-b-[1px] border-zinc-400 mt-2" />
      <div className="h-3 mt-2 w-4/5 rounded bg-zinc-300 dark:bg-zinc-700" />
      <div className="h-3 mt-1 w-2/5 rounded bg-zinc-300 dark:bg-zinc-700" />
      <div className="h-3 mt-1 w-2/5 rounded bg-zinc-300 dark:bg-zinc-700" />
      <div className="h-3 mt-3 w-1/5 rounded bg-zinc-300 dark:bg-zinc-700" />
    </Card>
  );
};

export default CompletedSkeleton;
