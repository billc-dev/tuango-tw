import axios from "axios";

let accessToken = "";

export const setAccessToken = (s: string) => {
  accessToken = s;
  axios.defaults.headers.common["Authorization"] = s;
};

export const getAccessToken = () => {
  return accessToken;
};
