import React, { FC } from "react";

import CardAvatar from "./CardAvatar";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  img: string;
  title: string;
  titleElement?: JSX.Element | null;
  subtitle?: string;
  action?: JSX.Element | null;
  notifications?: number;
}

const CardHeader: FC<Props> = (props) => {
  const { img, title, titleElement, subtitle, action, notifications, ...rest } =
    props;
  return (
    <div
      className="flex items-center justify-between py-4 select-none"
      {...rest}
    >
      <div className="flex">
        <CardAvatar img={img} alt={title} notifications={notifications} />
        <div className="ml-1 flex flex-col justify-center pl-2">
          <div className="flex">
            <span className="line-clamp-1 text-sm">{title}</span>
            <div>{titleElement}</div>
          </div>
          <div className="line-clamp-1 text-xs text-zinc-400">{subtitle}</div>
        </div>
      </div>
      <div>{action}</div>
    </div>
  );
};

export default CardHeader;
