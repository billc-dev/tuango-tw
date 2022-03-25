import React, { FC, useState } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface Props {
  img: string;
  alt: string;
}

const CardAvatar: FC<Props> = ({ img, alt }) => {
  const [error, setError] = useState(false);
  return (
    <div className="select-none h-10 w-10 rounded-full overflow-hidden">
      {!error ? (
        <LazyLoadImage
          effect="blur"
          alt={alt}
          className="bg-zinc-400 dark:bg-zinc-500"
          src={img}
          placeholder={<div className="h-10 w-10 rounded-full bg-zinc-400" />}
          onError={() => setError(true)}
        />
      ) : (
        <div className="flex items-center justify-center rounded-full bg-zinc-400 text-xl text-white dark:bg-zinc-500">
          {alt.substring(0, 1)}
        </div>
      )}
    </div>
  );
};

export default CardAvatar;
