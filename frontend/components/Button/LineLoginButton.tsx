import { LINE_LOGIN_URL_WITH_PARAMS } from "domain/User/services/urls";
import React, { FC } from "react";
import { WINDOW_URL } from "utils/constants";
import Button from ".";

interface Props {
  text?: string;
  size?: "sm" | "lg";
}

const LineLoginButton: FC<Props> = ({ text, size }) => {
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
    >
      {text ? text : "登入"}
    </Button>
  );
};

export default LineLoginButton;
