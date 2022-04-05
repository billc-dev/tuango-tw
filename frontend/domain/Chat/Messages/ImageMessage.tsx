import React, { FC, useState } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";

import { IMessage } from "../types";

interface Props {
  message: IMessage;
  isUserMessage: boolean;
}

const ImageMessage: FC<Props> = ({ message, isUserMessage }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={` ${isUserMessage && "order-last"}`}>
      <LazyLoadImage
        className={`rounded-xl m-1 object-cover max-h-48 ${
          isUserMessage && "order-last"
        }`}
        placeholder={<div className="rounded-xl bg-zinc-300 h-48 w-48" />}
        src={message.imageUrl?.sm || ""}
        onLoad={() => setLoaded(true)}
      />
      {!loaded && (
        <div className="rounded-xl animate-pulse bg-zinc-300 h-48 w-48" />
      )}
    </div>
  );
};

export default ImageMessage;
