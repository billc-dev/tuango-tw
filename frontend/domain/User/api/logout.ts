import axios from "axios";

import { WINDOW_URL } from "utils/constants";

export const logout = () => {
  return axios.post(`${WINDOW_URL}/api/auth/logout`);
};
