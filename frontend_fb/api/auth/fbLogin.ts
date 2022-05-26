import axios from "axios";

import { FBProfile } from ".";

export const fbLogin = async (code: string, redirect_uri: string) => {
  const accessTokenRes = await axios.get(
    `https://graph.facebook.com/v13.0/oauth/access_token?client_id=${process.env.FB_CLIENT_ID}&redirect_uri=${redirect_uri}&client_secret=${process.env.FB_CLIENT_SECRET}&code=${code}`
  );
  const access_token = accessTokenRes.data.access_token;
  if (!access_token) throw "access_token missing";
  const profileRes = await axios.get(
    `https://graph.facebook.com/v13.0/me?fields=id,name,picture&access_token=${access_token}`
  );
  return profileRes.data as FBProfile;
};
