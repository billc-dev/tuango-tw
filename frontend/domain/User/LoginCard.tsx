import Button from "components/Button";
import React from "react";
import { LINE_LOGIN_URL_WITH_PARAMS } from "./urls";

const LoginCard = () => {
  return (
    <div className="flex h-24 w-full items-center justify-center rounded-xl bg-zinc-600 p-4">
      <Button
        fullWidth
        onClick={() =>
          window.open(
            LINE_LOGIN_URL_WITH_PARAMS(`?redirect=${window.location.href}`),
            "_self"
          )
        }
      >
        登入
      </Button>
    </div>
  );
};

export default LoginCard;
