import type { NextPage } from "next";
import { useGetPostsQuery } from "../redux/postApi";

const Posts: NextPage = () => {
  const { data, error, isLoading } = useGetPostsQuery(1);
  console.log(data);

  return (
    <div className="bg-indigo-400">
      {data?.map((post) => (
        <div key={post._id}>
          #{post.postNum} {post.title} {post.displayName}
        </div>
      ))}
    </div>
  );
};

export default Posts;
