import React, { FC } from "react";

import { IUser } from "api/auth/userDB";
import CardHeader from "components/Card/CardHeader";
import PopupDialog from "components/Dialog/PopupDialog";

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
        <CardHeader
          key={user._id}
          img={user.pictureUrl}
          title={user.displayName}
          onClick={() => {
            setUser(user);
            setDisplayName(user.displayName);
            handleClose();
          }}
        />
      ))}
    </PopupDialog>
  );
};

export default UsersDialog;
