import type { NextPage } from "next";
import { useGetPostsQuery } from "../redux/postApi";
import Link from "next/link";
const Home: NextPage = () => {
  const { data, error, isLoading } = useGetPostsQuery(1);
  console.log(data);
  console.log("error", error);

  return (
    <div className="bg-indigo-400">
      <Link href="/posts">Posts</Link>
    </div>
  );
};

export default Home;
