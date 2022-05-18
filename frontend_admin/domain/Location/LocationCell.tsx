import React, { FC } from "react";

import { ILocation } from "./const";

interface Props {
  location: ILocation;
  setSelections: React.Dispatch<React.SetStateAction<ILocation[][]>>;
  setLocation: (location: string) => void;
}

const LocationCell: FC<Props> = ({ location, setSelections, setLocation }) => {
  const handleClick = () => {
    if (location.children) {
      return setSelections((selections) => {
        if (!location.children) return selections;
        return [...selections, location.children];
      });
    }
    setLocation(location.value);
  };
  const getColSpan = () => {
    if (location.span === 4) return "col-span-4";
    else if (location.span === 6) return "col-span-6";
    else return "col-span-12";
  };
  return (
    <div
      className={`${getColSpan()} text-center px-4 py-4 bg-zinc-300 hover:bg-zinc-400 cursor-pointer ${
        location.span === 4 ? "text-xl" : "text-2xl"
      }`}
      onClick={handleClick}
    >
      {location.label ?? location.value}
    </div>
  );
};

export default LocationCell;
