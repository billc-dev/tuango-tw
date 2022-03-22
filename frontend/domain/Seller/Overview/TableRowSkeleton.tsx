import React from "react";

const TableRowSkeleton = () => {
  return (
    <tr className="border-b">
      <td className="py-2">
        <div className="bg-zinc-400 w-12 h-6 rounded animate-pulse" />
      </td>
      <td className="py-2 w-full">
        <div className="bg-zinc-400 w-44 h-6 rounded animate-pulse" />
      </td>
      <td className="py-2 w-full">
        <div className="bg-zinc-400 w-5 h-6 rounded animate-pulse m-auto" />
      </td>
      <td className="py-2 w-[58px]">
        <div className="bg-zinc-400 w-14 h-8 rounded animate-pulse m-auto" />
      </td>
    </tr>
  );
};

export default TableRowSkeleton;
