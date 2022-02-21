import { useEffect } from "react";

import { useRouter } from "next/router";

const ErrorPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("posts");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

export default ErrorPage;
