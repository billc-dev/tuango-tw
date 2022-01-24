import type { NextPage } from "next";
import { useGetPostsQuery } from "../redux/postApi";
import Link from "next/link";
const Home: NextPage = () => {
  const { data, error, isLoading } = useGetPostsQuery(1);
  console.log(data);

  return (
    <div className="bg-indigo-400">
      <Link href="/posts">Posts</Link>
      {data?.map((post) => (
        <div key={post._id}>
          #{post.postNum} {post.title} {post.displayName}
        </div>
      ))}
    </div>
  );
};

export default Home;
