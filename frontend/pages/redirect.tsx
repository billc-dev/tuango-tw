import Button from "components/Core/Button";
import { useGetCode } from "hooks/login";
import { useMutateLogin } from "hooks/mutation/useMutateLogin";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { WINDOW_URL } from "utils/urls";

const Redirect: NextPage = () => {
  const code = useGetCode();
  const router = useRouter();
  const login = useMutateLogin();

  useEffect(() => {
    if (typeof window !== "undefined" && code) {
      login.mutate({ code, url: WINDOW_URL });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <div>
      <Button onClick={() => router.push("/login")}>Login</Button>
    </div>
  );
};

export default Redirect;
