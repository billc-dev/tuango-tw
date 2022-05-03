import React, { FC } from "react";

import { LINE_LOGIN_URL } from "domain/User/services";

import Button from ".";

interface Props {
  text?: string;
  size?: "xl" | "lg";
  className?: string;
}

const LineLoginButton: FC<Props> = ({ text, size, className }) => {
  return (
    <Button
      variant="primary"
      size={size}
      onClick={() => {
        window.open(LINE_LOGIN_URL, "_self");
      }}
      className={className}
    >
      {text ? text : "登入"}
    </Button>
  );
};

export default LineLoginButton;
