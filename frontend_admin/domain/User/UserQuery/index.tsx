import React, { FC, useState } from "react";

import { IUser } from "api/auth/userDB";
import TextField from "components/TextField";

import UsersDialog from "./UsersDialog";

interface Props {
  placeholder: string;
  setUser: (user: IUser) => void;
  isSeller?: boolean;
  variant?: "standard";
  fullWidth?: boolean;
  color?: "grey";
  noLabel?: boolean;
}

const UserQuery: FC<Props> = (props) => {
  const { placeholder, isSeller, setUser, variant, fullWidth, color, noLabel } =
    props;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    setName(displayName);
    setOpen(true);
  };
  return (
    <>
      <TextField
        color={color}
        value={displayName}
        className={`${fullWidth ? "w-full" : "w-32 xl:w-40"}`}
        name="displayName"
        placeholder={placeholder}
        noLabel={noLabel}
        variant={variant}
        onChange={(e) => setDisplayName(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {open && (
        <UsersDialog
          {...{
            open,
            placeholder,
            name,
            handleClose,
            isSeller,
            setUser,
            setDisplayName,
          }}
        />
      )}
    </>
  );
};

export default UserQuery;
