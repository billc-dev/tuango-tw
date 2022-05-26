import React, { FC, useState } from "react";

import Button from "components/Button";

import LocationCell from "./LocationCell";
import { locations as constLocations } from "./const";

interface Props {
  setLocation: (location: string) => void;
}

const LocationSelector: FC<Props> = ({ setLocation }) => {
  const [selections, setSelections] = useState([constLocations]);
  return (
    <div className="max-w-sm mx-auto mt-2">
      <div className="mb-2 flex">
        {selections.map((_, index) => (
          <Button
            key={index}
            className="mr-2"
            onClick={() => setSelections(selections.splice(0, index + 1))}
          >
            第{index + 1}層
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-12 gap-2">
        {selections[selections.length - 1].map((location) => (
          <LocationCell
            key={location.value}
            {...{ location, setSelections, setLocation }}
          />
        ))}
      </div>
    </div>
  );
};

export default LocationSelector;
