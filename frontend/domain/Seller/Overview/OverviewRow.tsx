import { useRouter } from "next/router";
import React, { FC } from "react";

import Button from "components/Button";
import { IPost } from "domain/Post/types";
import { shallowPush } from "utils/routing";

interface Props {
  post: IPost;
}

const OverviewRow: FC<Props> = ({ post }) => {
  const router = useRouter();
  const { postNum, title, orderCount } = post;
  const openPost = () =>
    shallowPush(router, { ...router.query, postId: post._id });
  const openOrderDialog = () =>
    shallowPush(router, { ...router.query, orderDialog: post._id });
  return (
    <tr className="border-b">
      <td className="py-2" onClick={openPost}>
        {postNum}
      </td>
      <td className="py-2" onClick={openPost}>
        {title}
      </td>
      <td className="py-2 text-center">{orderCount}</td>
      <td className="py-2 w-[58px]">
        <Button className="m-auto" onClick={openOrderDialog}>
          訂單
        </Button>
      </td>
    </tr>
  );
};

export default OverviewRow;
