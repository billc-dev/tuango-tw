import { fetchPost } from "api/posts";
import { date } from "functions/date";
import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useQuery } from "react-query";
import { Post } from "types";

interface Props {
  props: {
    id: string;
    post: {
      post: Post;
    };
  };
}

const ID: NextPage<Props> = ({ props }) => {
  const { id } = props;
  //   const { pageIndex, postIndex } = router.query;
  //   const queryClient = useQueryClient();
  //     queryClient.getQueryData<{ pages: [{ posts: Post[] }] }>("posts");
  //   const [post, setPost] = useState<Post>();
  const { data: postData } = useQuery(
    ["post", id],
    () => fetchPost(id as string),
    { staleTime: Infinity, initialData: props.post }
  );

  const post = postData?.post;
  //   useEffect(() => {
  //     if (data && Number(pageIndex) >= 0 && Number(postIndex) >= 0) {
  //       //   setPost(data.pages[Number(pageIndex)].posts[Number(postIndex)]);
  //     }
  //     //   if (data) {
  //     //     data.pages.some((page) => {
  //     //       return page.posts.some((post) => {
  //     //         if (post._id === id) return true;
  //     //       });
  //     //     });
  //     //   }
  //   }, []);

  return (
    <>
      <Head>
        <title>
          #{post?.postNum} {post?.title} #{post?.displayName} - 開心團購
        </title>
        <meta
          itemProp="name"
          content={`#${post?.postNum} ${post?.title} #${post?.displayName} - 開心團購`}
        />
        <meta name="description" content={post?.body} />
        <meta property="og:image" content={post?.imageUrls[0].md} />
      </Head>
      <div className="fixed top-0 z-50 h-14 w-full bg-white p-4 dark:bg-zinc-800">
        Header
      </div>
      <div className="py-2 px-6">
        <div className="flex items-center py-4">
          <div className="h-10 w-10">
            <LazyLoadImage
              alt="product"
              className="rounded-full"
              src={post?.pictureUrl}
            />
          </div>
          <div className="flex flex-col pl-2">
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

ID.getInitialProps = async (ctx: NextPageContext) => {
  const id = ctx.query.id as string;
  const data = await fetchPost(id);

  return { props: { id, post: data } };
};

export default ID;
