import Button from "components/Core/Button";
import type { NextPage } from "next";
import { LINE_LOGIN_URL } from "utils/urls";

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
