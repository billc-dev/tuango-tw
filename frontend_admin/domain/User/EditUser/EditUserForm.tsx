import React, { FC, useState } from "react";

import Select from "components/Select";
import TextField from "components/TextField";
import { getFullLengthDate } from "services/date";

import { usePatchUser } from "../hooks";
import { User } from "../types";
import UploadImage from "./UploadImage";

interface Props {
  user: User;
  handleClose: () => void;
}

const EditUserForm: FC<Props> = (props) => {
  const patchUser = usePatchUser();
  const [user, setUser] = useState(props.user);
  const { createdAt, displayName, pickupNum, notified, status, role } = user;
  const { pictureUrl } = user;
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    patchUser.mutate(user, {
      onSuccess: () => props.handleClose(),
    });
    // updateOrder.mutate(order, { onSuccess: () => props.handleClose() });
  };
  const setImage = (image: string) => {
    setUser((user) => ({ ...user, pictureUrl: image }));
  };
  return (
    <form id="user-form" onSubmit={handleSubmit}>
      <div className="mt-2">
        <p className="mb-2">註冊時間: {getFullLengthDate(createdAt)}</p>
        <TextField
          name="displayName"
          color="grey"
          placeholder="名稱"
          value={displayName}
          onChange={handleChange}
        />
        <TextField
          name="pickupNum"
          disabled
          color="grey"
          type="number"
          placeholder="會員編號"
          value={pickupNum}
          onChange={handleChange}
        />
        <p className="mb-2">Notify</p>
        <Select
          name="notified"
          value={notified.toString()}
          variant="contained"
          height="tall"
          options={[
            { label: "已設定", value: true },
            { label: "未設定", value: false },
          ]}
          onChange={handleChange}
        />
        <p className="mb-2">狀態</p>
        <Select
          name="status"
          value={status}
          variant="contained"
          height="tall"
          options={[
            { label: "已申請", value: "registered" },
            { label: "已核准", value: "approved" },
            { label: "已封鎖", value: "blocked" },
          ]}
          onChange={handleChange}
        />
        <p className="mb-2">身份</p>
        <Select
          name="role"
          value={role}
          variant="contained"
          height="tall"
          options={[
            { label: "買家", value: "basic" },
            { label: "賣家", value: "seller" },
            { label: "管理員", value: "admin", disabled: true },
          ]}
          onChange={handleChange}
        />
        <UploadImage text="更改照片" {...{ setImage }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={pictureUrl} alt="profile" className="w-full mt-4" />
      </div>
    </form>
  );
};

export default EditUserForm;
