import axios from "axios";

interface Login {
  code: string;
  url: string;
}
export const login = ({ code, url }: Login) => {
  axios.post("/login");
};
