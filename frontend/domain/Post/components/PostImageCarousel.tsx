import React, { FC, useState } from "react";

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { ImageUrl } from "../types";

interface Props {
  imageUrls: ImageUrl[];
}

const PostImageCarousel: FC<Props> = ({ imageUrls }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const images = imageUrls.filter((image) => image.md);
  return (
    <>
      <Carousel
        centerMode
        showStatus={false}
        showArrows={false}
        centerSlidePercentage={100}
        className="-mb-10"
        onChange={(index) => setIndex(index)}
        onClickItem={() => setOpen(true)}
      >
        {images.map((image, index) => (
          <div key={index}>
            <LazyLoadImage
              effect="blur"
              placeholder={<div className="h-72 w-full bg-zinc-500" />}
              className="max-h-72 object-contain"
              src={image.md}
            />
          </div>
        ))}
      </Carousel>
      {open && (
        <Lightbox
          mainSrc={images[index].md}
          nextSrc={images[(index + 1) % images.length].md}
          prevSrc={images[(index + images.length - 1) % images.length].md}
          onCloseRequest={() => setOpen(false)}
          onMovePrevRequest={() =>
            setIndex((index + images.length - 1) % images.length)
          }
          onMoveNextRequest={() => setIndex((index + 1) % images.length)}
        />
      )}
    </>
  );
};

export default PostImageCarousel;
