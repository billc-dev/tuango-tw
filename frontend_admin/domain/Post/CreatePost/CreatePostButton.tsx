import { useRouter } from "next/router";
import React from "react";

import { DocumentAddIcon } from "@heroicons/react/outline";
import { shallowPush } from "utils";

import Button from "components/Button";

const CreatePostButton = () => {
  const router = useRouter();
  return (
    <div className="mt-4">
      <Button
        variant="primary"
        fullWidth
        icon={<DocumentAddIcon />}
        onClick={() =>
          shallowPush(router, { ...router.query, createPost: "open" })
        }
      >
        新增貼文
      </Button>
    </div>
  );
};

export default CreatePostButton;
