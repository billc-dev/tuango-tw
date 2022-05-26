import React, { FC } from "react";

import Button from ".";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  hasName: boolean;
  fullWidth?: boolean;
  short?: boolean;
}

const OrderHasNameButton: FC<Props> = ({
  hasName,
  short,
  className,
  ...props
}) => {
  return (
    <Button
      fullWidth
      variant={hasName ? "primary" : undefined}
      className={`whitespace-nowrap ${className}`}
      {...props}
    >
      {hasName ? "有貼" : "沒貼"}
      {!short && "名字"}
    </Button>
  );
};

export default OrderHasNameButton;
