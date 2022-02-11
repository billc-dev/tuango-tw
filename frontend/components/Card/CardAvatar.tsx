import React, { FC, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface Props {
  img: string;
  alt: string;
}

const CardAvatar: FC<Props> = ({ img, alt }) => {
  const [error, setError] = useState(false);
  return (
    <div className="mr-1 flex h-10 w-10 select-none items-center justify-center rounded-full bg-gray-400 text-xl text-white dark:bg-zinc-500">
      {!error ? (
        <LazyLoadImage
          alt={alt}
          className="rounded-full"
          src={img}
          onError={() => setError(true)}
        />
      ) : (
        alt.substring(0, 1)
      )}
    </div>
  );
};

export default CardAvatar;
