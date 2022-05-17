import Image from "next/image";
import React, { FC, useState } from "react";

// import { LazyLoadImage } from "react-lazy-load-image-component";

interface Props {
  img: string;
  alt: string;
  notifications?: number;
}

const CardAvatar: FC<Props> = ({ img, alt, notifications }) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative select-none min-w-[40px]">
      {!error ? (
        <Image
          alt={alt}
          src={img}
          height={40}
          width={40}
          className={`rounded-full transition-all duration-300 ${
            loaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
          }`}
          onLoadingComplete={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      ) : (
        // <LazyLoadImage
        //   alt={alt}
        //   className={`h-10 w-10 rounded-full overflow-hidden transition-all duration-300 ${
        //     loaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
        //   }`}
        //   src={img}
        //   onLoad={() => setLoaded(true)}
        //   placeholder={<div className="h-10 w-10 rounded-full bg-zinc-400" />}
        //   onError={() => setError(true)}
        // />
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-400 text-xl text-white dark:bg-zinc-500">
          {alt.substring(0, 1)}
        </div>
      )}
      {notifications ? (
        <div className="absolute -top-2.5 -right-2.5 rounded-full bg-red-600 text-sm text-white">
          <div className="mx-2 my-0.5">{notifications}</div>
        </div>
      ) : null}
    </div>
  );
};

export default CardAvatar;
