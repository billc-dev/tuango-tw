import React, { FC } from "react";

import { IUser } from "api/auth/userDB";
import PopupDialog from "components/Dialog/PopupDialog";
import LoadingIndicator from "components/Indicator/LoadingIndicator";

import UserHeader from "../UserHeader";
import { useUsers } from "../hooks";

interface Props {
  placeholder: string;
  open: boolean;
  handleClose: () => void;
  name: string;
  isSeller?: boolean;
  setUser: (user: IUser) => void;
  setDisplayName: React.Dispatch<React.SetStateAction<string>>;
}

const UsersDialog: FC<Props> = (props) => {
  const {
    placeholder,
    open,
    handleClose,
    name,
    isSeller,
    setUser,
    setDisplayName,
  } = props;
  const usersQuery = useUsers(name, isSeller);
  return (
    <PopupDialog title={placeholder} {...{ open, handleClose }}>
      {usersQuery.data?.map((user) => (
        <UserHeader
          key={user._id}
          user={user}
          onClick={() => {
            setUser(user);
            setDisplayName(user.displayName);
            handleClose();
          }}
        />
      ))}
      <LoadingIndicator loading={usersQuery.isLoading} />
    </PopupDialog>
  );
};

export default UsersDialog;
