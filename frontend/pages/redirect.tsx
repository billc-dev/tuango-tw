import { useGetCode } from "hooks/login";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
// import { useLoginMutation } from "redux/user";

const Redirect: NextPage = () => {
  const code = useGetCode();
  const router = useRouter();
  // const [login, res] = useLoginMutation();

  // useEffect(() => {
  //   const asyncLogin = async () => {
  //     if (code && typeof window !== "undefined") {
  //       const url = window.location.protocol + "//" + window.location.host;
  //       await login({ code, url });
  //       console.log(res.data);
  //       if (res.data?.username) router.push("/");
  //     }
  //   };
  //   asyncLogin();
  // }, [code]);

  return <div></div>;
};

export default Redirect;
