import Button from "components/Button";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";

const Home: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return (
    <div>
      <Button onClick={() => router.push("/posts")}>Posts</Button>
      <br />
      <Button onClick={() => router.push("/login")}>Login</Button>
      <Button onClick={() => queryClient.refetchQueries("user")}>
        reset user
      </Button>
    </div>
  );
};

export default Home;
