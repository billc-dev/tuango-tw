import { LINE_LOGIN_URL_WITH_PARAMS } from "domain/User/urls";
import React, { FC } from "react";
import Button from ".";

interface Props {
  text?: string;
}

const LineLoginButton: FC<Props> = ({ text }) => {
  return (
    <Button
      onClick={() =>
        window.open(
          LINE_LOGIN_URL_WITH_PARAMS(`?redirect=${window.location.href}`),
          "_self"
        )
      }
    >
      {text ? text : "登入"}
    </Button>
  );
};

export default LineLoginButton;
