import React, { FC, useState } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";

interface Props {
  image: string;
}

const PostImage: FC<Props> = ({ image }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div>
      <LazyLoadImage
        src={image}
        placeholder={
          <div className="h-72 w-full bg-zinc-300 dark:bg-zinc-700" />
        }
        className={`max-h-72 object-contain transition-all duration-300 ${
          loaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default PostImage;
