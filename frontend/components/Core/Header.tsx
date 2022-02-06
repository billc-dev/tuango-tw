import React, { FC } from "react";
import ProfileImage from "./ProfileImage";

interface Props {
  img: string;
  title: string;
  subtitle?: string;
}

const Header: FC<Props> = (props) => {
  const { img, title, subtitle } = props;
  return (
    <div className="flex items-center py-4">
      <ProfileImage img={img} alt={title} />
      <div className="flex w-4/5 flex-col pl-2">
        <div className="truncate text-sm">{title}</div>
        <div className="text-xs text-zinc-400">{subtitle}</div>
      </div>
    </div>
  );
};

export default Header;
