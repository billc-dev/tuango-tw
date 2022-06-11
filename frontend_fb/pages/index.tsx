import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/posts");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

export default Home;
