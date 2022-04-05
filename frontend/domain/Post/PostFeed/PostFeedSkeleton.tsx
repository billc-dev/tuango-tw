import React from "react";

const PostFeedSkeleton = () => {
  return (
    <div className="px-4 w-full animate-pulse max-w-lg">
      <div className="flex items-center py-4">
        <div className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <div className="ml-1 flex flex-col pl-2">
          <div className="w-20 h-3 rounded bg-zinc-300 dark:bg-zinc-700" />
          <div className="w-40 h-3 mt-1.5 rounded bg-zinc-300 dark:bg-zinc-700" />
        </div>
      </div>
      <div className="h-72 w-11/12 mx-auto bg-zinc-300 dark:bg-zinc-700" />
      <div className="h-4 mt-5 w-80 rounded bg-zinc-300 dark:bg-zinc-700" />
      <div className="h-4 mt-2 w-[152px] rounded bg-zinc-300 dark:bg-zinc-700" />
      <div className="h-4 mt-2 w-[152px] rounded bg-zinc-300 dark:bg-zinc-700" />
      <div className="h-4 mt-6 w-64 rounded bg-zinc-300 dark:bg-zinc-700" />
      <div className="h-4 mt-2 w-52 rounded bg-zinc-300 dark:bg-zinc-700" />
      <div className="h-4 mt-2 w-72 rounded bg-zinc-300 dark:bg-zinc-700" />
      <div className="h-4 mt-2 w-32 rounded bg-zinc-300 dark:bg-zinc-700" />
      <div className="rounded bg-zinc-300 dark:bg-zinc-700" />
      <div className={`mt-5 h-12 rounded-lg bg-zinc-300 dark:bg-zinc-700`} />
    </div>
  );
};

export default PostFeedSkeleton;
