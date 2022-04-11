import React from "react";

const RoomListSkeleton = () => {
  return (
    <div className="w-full animate-pulse max-w-lg">
      <div className="flex items-center py-4">
        <div className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <div className="ml-1 flex flex-col pl-2">
          <div className="w-20 h-3 rounded bg-zinc-300 dark:bg-zinc-700" />
          <div className="w-40 h-3 mt-1.5 rounded bg-zinc-300 dark:bg-zinc-700" />
        </div>
      </div>
    </div>
  );
};

export default RoomListSkeleton;
