import React, { FC, useState } from "react";

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { ImageUrl } from "../types";
import PostImage from "./PostImage";

interface Props {
  imageUrls: ImageUrl[];
}

const PostImageCarousel: FC<Props> = ({ imageUrls }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const images = imageUrls.filter((image) => image.md);
  return (
    <div className="overflow-hidden -mx-4 select-none">
      <Carousel
        centerMode
        showStatus={false}
        showArrows={false}
        centerSlidePercentage={100}
        preventMovementUntilSwipeScrollTolerance
        swipeScrollTolerance={30}
        className="-mb-10"
        onChange={(index) => setIndex(index)}
        onClickItem={() => setOpen(true)}
      >
        {images.map((image, index) => (
          <PostImage key={index} image={image.md} />
        ))}
      </Carousel>
      {open && (
        // @ts-ignore
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
    </div>
  );
};

export default PostImageCarousel;
