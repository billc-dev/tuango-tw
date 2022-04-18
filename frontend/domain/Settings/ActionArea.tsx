import React, { Dispatch, FC, SetStateAction } from "react";

import {
  PlayIcon,
  ShoppingBagIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";

import NavigationButton from "components/Button/NavigationButton";
import { setStorageViewMode } from "services/setting";

interface Props {
  viewMode: string;
  setViewMode: Dispatch<SetStateAction<string>>;
}

const ActionArea: FC<Props> = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex -mb-2">
      <NavigationButton
        text="切換檢視模式"
        className="pt-2"
        onClick={() => {
          const newMode = viewMode === "cards" ? "feed" : "cards";
          setViewMode(newMode);
          setStorageViewMode(newMode);
        }}
      >
        <ViewGridIcon />
      </NavigationButton>
      <NavigationButton text="待認購" path="/extra" className="pt-2">
        <ShoppingBagIcon />
      </NavigationButton>
      <NavigationButton
        text="使用教學"
        className="pt-2"
        onClick={() => window.open("https://youtu.be/EejAputRJqQ")}
      >
        <PlayIcon />
      </NavigationButton>
    </div>
  );
};

export default ActionArea;
