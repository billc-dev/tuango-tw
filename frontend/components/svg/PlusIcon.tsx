import React, { FC } from "react";

const PlusIcon: FC = (props) => {
  return React.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        "aria-hidden": "true",
      },
      props
    ),
    /*#__PURE__*/ React.createElement("path", {
      fillRule: "evenodd",
      d: "M10 8H8v4H4v2h4v4h2v-4h4v-2h-4V8zm4.5-1.92V7.9l2.5-.5V18h2V5l-4.5 1.08z",
      clipRule: "evenodd",
    })
  );
};

export default PlusIcon;
