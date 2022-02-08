import React, { FC, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { ImageUrl } from "../post";

interface Props {
  imageUrls: ImageUrl[];
}

const PostImageCarousel: FC<Props> = ({ imageUrls }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    // <Swiper
    //   pagination
    //   virtual
    //   modules={[Pagination, Virtual]}
    //   // @ts-ignore
    //   style={{ "--swiper-pagination-color": "rgb(34 197 94)" }}
    // >
    //   {imageUrls.map((image, index) => {
    //     if (image.md)
    //       return (
    //         <SwiperSlide key={index} virtualIndex={index}>
    //           <LazyLoadImage className="mx-auto max-h-72" src={image.md} />
    //         </SwiperSlide>
    //       );
    //     else return null;
    //   })}
    // </Swiper>
    <Slider arrows={false} dots className="mb-4 w-full">
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
