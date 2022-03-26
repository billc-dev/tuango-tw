import React, { FC, useState } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";

interface Props {
  img: string;
  alt: string;
}

const CardAvatar: FC<Props> = ({ img, alt }) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="select-none  overflow-hidden">
      {!error ? (
        <LazyLoadImage
          alt={alt}
          className={`h-10 w-10 rounded-full overflow-hidden transition-all ${
            loaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
          }`}
          src={img}
          onLoad={() => setLoaded(true)}
          placeholder={<div className="h-10 w-10 rounded-full bg-zinc-400" />}
          onError={() => setError(true)}
        />
      ) : (
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-400 text-xl text-white dark:bg-zinc-500">
          {alt.substring(0, 1)}
        </div>
      )}
    </div>
  );
};

export default CardAvatar;
