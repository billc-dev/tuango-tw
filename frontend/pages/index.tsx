import Button from "components/Core/Button";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.push("/posts")}>Posts</Button>
      <br />
      <Button onClick={() => router.push("/login")}>Login</Button>
    </div>
  );
};

export default Home;
