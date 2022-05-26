import React, { FC, useState } from "react";

import { PlusIcon } from "@heroicons/react/outline";

import Button from "components/Button";
import { usePostByPostNum } from "domain/Post/hooks";

import CreateDialog from "./CreateDialog";

interface Props {
  postNum: string;
}

const CreateOrderedOrder: FC<Props> = ({ postNum }) => {
  const postQuery = usePostByPostNum(postNum);
  const [open, setOpen] = useState(false);
  return (
    <div className="my-2">
      <Button icon={<PlusIcon />} fullWidth onClick={() => setOpen(true)}>
        新增訂單
      </Button>
      {open && postQuery.data && (
        <CreateDialog
          post={postQuery.data}
          handleClose={() => setOpen(false)}
          {...{ open }}
        />
      )}
    </div>
  );
};

export default CreateOrderedOrder;
