import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { date } from "services/date";
import { Post } from "types";

interface Props {
  post: Post;
}

const PostContent: FC<Props> = (props) => {
  const { post } = props;
  return (
    <>
      {/* <Head>
        <title>
          #{post?.postNum} {post?.title} #{post?.displayName} - 開心團購
        </title>
        <meta
          itemProp="name"
          content={`#${post?.postNum} ${post?.title} #${post?.displayName} - 開心團購`}
        />
        <meta name="description" content={post?.body} />
        <meta property="og:image" content={post?.imageUrls[0].md} />
      </Head> */}
      {/* <div className="fixed top-0 z-50 h-14 w-full truncate bg-white p-4 dark:bg-zinc-800">
        <IconButton
          onClick={() => {
            // isSSR ? router.push("/posts") : router.back();
          }}
        >
          <XIcon />
        </IconButton>
        <title>{post?.title}</title>
      </div> */}
      <div className="py-2 px-6">
        <div className="flex items-center py-4">
          <div className="h-10 w-10">
            <LazyLoadImage
              alt="product"
              className="rounded-full"
              src={post?.pictureUrl}
            />
          </div>
          <div className="flex w-4/5 flex-col pl-2">
            <div className="truncate text-sm">{post?.displayName}</div>
            <div className="text-sm">{post?.createdAt}</div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <LazyLoadImage className="max-h-72" src={post?.imageUrls[0].md} />
        </div>
        <div className="py-4">
          <p className="font-bold">
            #{post?.postNum} {post?.title} #{post?.displayName}
          </p>
          <p className="pt-4">
            ❤️ #結單日: {post?.deadline ? date(post?.deadline) : "成團通知"}
          </p>
          <p>
            💚 #到貨日:{" "}
            {post?.deliveryDate ? date(post?.deliveryDate) : "貨到通知"}
          </p>
          <p className="whitespace-pre-line pt-4">{post?.body}</p>
        </div>
      </div>
    </>
  );
};

export default PostContent;
