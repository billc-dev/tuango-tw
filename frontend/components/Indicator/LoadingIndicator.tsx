import React, { FC } from "react";

import AnimatedSpinner from "components/svg/AnimatedSpinner";

interface Props {
  loading: boolean;
}

const LoadingIndicator: FC<Props> = ({ loading }) => {
  return (
    <div
      className={`rounded shadow transition-opacity bg-zinc-200 dark:bg-zinc-600 p-1.5 fixed top-16 left-3 z-50 ${
        loading ? "opacity-95" : "opacity-0"
      }`}
    >
      <AnimatedSpinner />
    </div>
  );
};

export default LoadingIndicator;
