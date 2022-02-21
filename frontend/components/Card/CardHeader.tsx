import React, { FC } from "react";

import CardAvatar from "./CardAvatar";

interface Props {
  img: string;
  title: string;
  subtitle?: string;
  action?: JSX.Element | null;
}

const CardHeader: FC<Props> = (props) => {
  const { img, title, subtitle, action } = props;
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex">
        <CardAvatar img={img} alt={title} />
        <div className="ml-1 flex flex-col pl-2">
          <div className="truncate text-sm">{title}</div>
          <div className="text-xs text-zinc-400">{subtitle}</div>
        </div>
      </div>
      <div>{action}</div>
    </div>
  );
};

export default CardHeader;
