import Button from "components/Button";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.push("/posts")}>Posts</Button>
      {/* <Link href="/posts">posts</Link> */}
      <br />
      <Button onClick={() => router.push("/login")}>Login</Button>
      {/* <Link href="/login">login</Link> */}
    </div>
  );
};

export default Home;
