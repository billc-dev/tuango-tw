import { useRouter } from "next/router";
import React, { FC } from "react";

import { FB_LOGIN_URL, isClient } from "utils/constants";

import Button from ".";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text?: string;
  size?: "sm" | "lg";
}

const FBLoginButton: FC<Props> = ({ text, ...props }) => {
  const router = useRouter();
  return (
    <Button
      variant="blue"
      onClick={() => {
        isClient && localStorage.setItem("next", router.asPath);
        window.open(FB_LOGIN_URL(), "_self");
      }}
      {...props}
    >
      {text ? text : "登入"}
    </Button>
  );
};

export default FBLoginButton;
