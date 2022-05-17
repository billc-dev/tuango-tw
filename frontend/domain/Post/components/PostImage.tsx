import Image from "next/image";
import React, { FC, useState } from "react";

interface Props {
  image: string;
}

const PostImage: FC<Props> = ({ image }) => {
  const [loaded, setLoaded] = useState(false);
  if (image.includes("ibb.co")) return null;
  return (
    // <div>
    //   <LazyLoadImage
    //     src={image}
    //     placeholder={
    //       <div className="h-72 w-full bg-zinc-300 dark:bg-zinc-700" />
    //     }
    //     className={`max-h-72 object-contain transition-all duration-300 ${
    //       loaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
    //     }`}
    //     onLoad={() => setLoaded(true)}
    //   />
    // </div>
    <div className="relative h-72">
      <Image
        alt="product"
        src={image}
        layout="fill"
        objectFit="contain"
        className={`transition-all duration-300 ${
          loaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
        }`}
        onLoadingComplete={() => setLoaded(true)}
      />
    </div>
  );
};

export default PostImage;
