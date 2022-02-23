import React, { FC } from "react";

const PostCardGrid: FC = ({ children }) => {
  return (
    <div className="grid grid-cols-2 gap-2 p-2 pb-0 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mb-2">
      {children}
    </div>
  );
};

export default PostCardGrid;
