import React, { FC } from "react";

import CardAvatar from "./CardAvatar";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  img: string;
  title: string;
  subtitle?: string;
  action?: JSX.Element | null;
  notifications?: number;
}

const CardHeader: FC<Props> = (props) => {
  const { img, title, subtitle, action, notifications, ...rest } = props;
  return (
    <div
      className="flex items-center justify-between py-4 select-none"
      {...rest}
    >
      <div className="flex">
        <CardAvatar img={img} alt={title} notifications={notifications} />
        <div className="ml-1 flex flex-col justify-center pl-2">
          <div className="line-clamp-1 text-sm">{title}</div>
          <div className="line-clamp-1 text-xs text-zinc-400">{subtitle}</div>
        </div>
      </div>
      <div>{action}</div>
    </div>
  );
};

export default CardHeader;
