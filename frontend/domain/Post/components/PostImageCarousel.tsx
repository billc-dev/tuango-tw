import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { ImageUrl } from "../post";

interface Props {
  imageUrls: ImageUrl[];
}

const PostImageCarousel: FC<Props> = ({ imageUrls }) => {
  return (
    <Slider arrows={false} dots className="-mx-6 mb-4 w-screen">
      {imageUrls.map((image, index) => {
        if (image.md)
          return (
            <div key={index} className="outline-none">
              <LazyLoadImage
                placeholder={<div className="h-72 w-full bg-zinc-500" />}
                className="mx-auto max-h-72"
                src={image.md}
              />
            </div>
          );
        else return null;
      })}
    </Slider>
  );
};

export default PostImageCarousel;
