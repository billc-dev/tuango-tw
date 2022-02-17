import React, { FC } from "react";

const PostCardSkeleton: FC = () => {
  return (
    <div
      className="flex h-[264px] max-w-[180px] animate-pulse flex-col overflow-hidden rounded-3xl bg-white
              shadow-md hover:shadow-2xl dark:bg-zinc-800 dark:hover:shadow-gray-900"
    >
      <div className="h-[180px] w-[180px] bg-zinc-400 object-cover dark:bg-zinc-700" />
      <div className="px-2 pt-2 pb-1">
        <div className="h-5 rounded bg-zinc-300 dark:bg-zinc-700" />
        <div className="mt-2 h-3 w-2/3 rounded bg-zinc-300 dark:bg-zinc-700" />
        <div className="flex justify-between pt-2">
          <div />
          <div className="mb-1 h-4 w-5/12 rounded bg-zinc-300 dark:bg-zinc-700" />
        </div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;
