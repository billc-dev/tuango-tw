import React, { FC } from "react";

import { LINE_LOGIN_URL_WITH_PARAMS } from "domain/User/services";
import { WINDOW_URL } from "utils/constants";

import Button from ".";

interface Props {
  text?: string;
  size?: "sm" | "lg";
  className?: string;
}

const LineLoginButton: FC<Props> = ({ text, size, className }) => {
  return (
    <Button
      variant="primary"
      size={size}
      onClick={() =>
        window.open(
          window.location.pathname === "/redirect"
            ? LINE_LOGIN_URL_WITH_PARAMS(`?redirect=${WINDOW_URL}`)
            : LINE_LOGIN_URL_WITH_PARAMS(`?redirect=${window.location.href}`),
          "_self"
        )
      }
      className={className}
    >
      {text ? text : "登入"}
    </Button>
  );
};

export default LineLoginButton;
