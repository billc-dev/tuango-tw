import Button from "components/Button";
import { LINE_LOGIN_URL } from "domain/Login/urls";
import type { NextPage } from "next";

const Login: NextPage = () => {
  return (
    <div>
      <Button onClick={() => window.open(LINE_LOGIN_URL, "_self")}>
        Login with Line
      </Button>
    </div>
  );
};

export default Login;
