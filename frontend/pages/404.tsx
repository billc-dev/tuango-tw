import { useRouter } from "next/router";
import { useEffect } from "react";

const ErrorPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("posts");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

export default ErrorPage;
