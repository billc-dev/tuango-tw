import axios from "axios";
import * as jwt from "jsonwebtoken";

interface lineLoginProps {
  code: string;
  url: string;
}

interface lineTokenDecoded {
  sub: string;
  name: string;
  picture: string;
}

export interface LineProfile {
  username: string;
  displayName: string;
  pictureUrl: string;
}

export const lineLogin = async ({ code, url }: lineLoginProps) => {
  const form = Object.entries({
    grant_type: "authorization_code",
    code,
    redirect_uri: url,
    client_id: process.env.LINE_ID,
    client_secret: process.env.LINE_SECRET,
  })
    .map(
      (x) =>
        `${encodeURIComponent(x[0])}=${encodeURIComponent(
          x[1] as string | number
        )}`
    )
    .join("&");

  try {
    const res = await axios.post("https://api.line.me/oauth2/v2.1/token", form);

    const { sub, name, picture } = jwt.decode(
      res.data.id_token
    ) as lineTokenDecoded;

    return {
      username: sub,
      displayName: name,
      pictureUrl: picture,
    };
  } catch (error) {
    console.log(error);
    throw "code is invalid";
  }
};
