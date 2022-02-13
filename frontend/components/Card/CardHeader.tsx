import React, { FC } from "react";
import CardAvatar from "./CardAvatar";

interface Props {
  img: string;
  title: string;
  subtitle?: string;
}

const CardHeader: FC<Props> = (props) => {
  const { img, title, subtitle } = props;
  return (
    <div className="flex items-center py-4">
      <CardAvatar img={img} alt={title} />
      <div className="ml-1 flex w-4/5 flex-col pl-2">
        <div className="truncate text-sm">{title}</div>
        <div className="text-xs text-zinc-400">{subtitle}</div>
      </div>
    </div>
  );
};

export default CardHeader;
