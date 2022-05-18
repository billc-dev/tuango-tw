import React, { FC, useState } from "react";

import { LocationMarkerIcon } from "@heroicons/react/solid";

import IconButton from "components/Button/IconButton";

import LocationSelectorDialog from "./LocationSelectorDialog";

interface Props {
  setLocation: (location: string) => void;
}

const LocationSelectorButton: FC<Props> = ({ setLocation }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <LocationMarkerIcon className="text-zinc-500" />
      </IconButton>
      <LocationSelectorDialog {...{ open, setOpen, setLocation }} />
    </>
  );
};

export default LocationSelectorButton;
