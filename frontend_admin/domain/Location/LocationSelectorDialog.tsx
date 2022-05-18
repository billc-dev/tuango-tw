import React, { FC } from "react";

import Dialog from "components/Dialog";

import LocationSelector from "./LocationSelector";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLocation: (location: string) => void;
}

const LocationSelectorDialog: FC<Props> = ({ open, setOpen, setLocation }) => {
  return (
    <Dialog title="位置" {...{ open, handleClose: () => setOpen(false) }}>
      <LocationSelector
        setLocation={(location) => {
          setLocation(location);
          setOpen(false);
        }}
      />
    </Dialog>
  );
};

export default LocationSelectorDialog;
