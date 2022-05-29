import axios from "axios";

import { API_URL } from "utils/constants";

import { LineProfile } from "./lineLogin";
import { IUser, User } from "./userDB";

export const findOrCreateUser = async (lineProfile: LineProfile) => {
  const { username } = lineProfile;
  if (!username) throw "username not present";

  const user = await User.findOne({ username });
  if (user) return updateUser(user, lineProfile);

  return createUser(lineProfile);
};

const createUser = async (lineProfile: LineProfile) => {
  const { username, displayName, pictureUrl } = lineProfile;

  const prevUser = await User.findOne({}).sort({ pickupNum: -1 });

  const user = new User({
    username,
    displayName,
    pictureUrl: `${pictureUrl}/small`,
    createdAt: new Date().toISOString(),
    pickupNum: prevUser ? prevUser.pickupNum + 1 : 1,
  });

  await user.save();

  return user;
};

const updateUser = async (user: IUser, lineProfile: LineProfile) => {
  const { username, displayName, pictureUrl } = lineProfile;
  if (
    user.displayName === displayName &&
    user.pictureUrl === `${pictureUrl}/small`
  ) {
    return user;
  }

  return User.findOneAndUpdate(
    { username },
    { displayName, pictureUrl: `${pictureUrl}/small` },
    { new: true }
  );
};

export const updateSellerPosts = async (userId: string) => {
  try {
    await axios.post(`${API_URL}/user/login/update`, { userId });
  } catch (error) {
    console.log("could not update user");
  }
};
