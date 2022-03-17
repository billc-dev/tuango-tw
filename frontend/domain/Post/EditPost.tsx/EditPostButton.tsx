import React, { FC, useState } from "react";

import { PencilIcon } from "@heroicons/react/outline";

import IconButton from "components/Button/IconButton";

import EditPost from ".";
import { IPost } from "../types";

interface Props {
  post: IPost;
}

const EditPostButton: FC<Props> = ({ post }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <PencilIcon className="text-zinc-500" />
      </IconButton>
      {open && <EditPost {...{ open, setOpen, post }} />}
    </div>
  );
};

export default EditPostButton;
