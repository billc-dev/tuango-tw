import React, { FC } from "react";

import { IUser } from "api/auth/userDB";
import Button from "components/Button";
import CardHeader from "components/Card/CardHeader";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  user: IUser;
  action?: JSX.Element | undefined;
}

const UserHeader: FC<Props> = ({ user, action, ...props }) => {
  return (
    <CardHeader
      key={user._id}
      img={user.pictureUrl}
      title={`${user.pickupNum}. ${user.displayName}`}
      titleElement={
        user.fb ? (
          <Button className="ml-1" variant="blue" size="small">
            FB
          </Button>
        ) : null
      }
      action={action}
      {...props}
    />
  );
};

export default UserHeader;
