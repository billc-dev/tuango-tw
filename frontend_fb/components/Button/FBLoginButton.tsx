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
        window.open(FB_LOGIN_URL(), "_self");
        isClient && localStorage.setItem("next", router.asPath);
      }}
      {...props}
    >
      {text ? text : "登入"}
    </Button>
  );
};

export default FBLoginButton;
