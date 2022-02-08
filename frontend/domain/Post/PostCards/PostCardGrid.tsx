import React, { FC } from "react";

const PostCardGrid: FC = ({ children }) => {
  return (
    <div className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3 md:grid-cols-4">
      {children}
    </div>
  );
};

export default PostCardGrid;
