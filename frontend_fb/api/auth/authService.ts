import { FBProfile } from ".";
import { IUser, User } from "./userDB";

export const findOrCreateFBUser = async (fbProfile: FBProfile) => {
  const { id } = fbProfile;
  if (!id) throw "id not present";

  const user = await User.findOne({ username: id });
  if (user) return updateFBUser(user, fbProfile);

  return createFBUser(fbProfile);
};

export const createFBUser = async (fbProfile: FBProfile) => {
  const { id, name, picture } = fbProfile;

  const prevUser = await User.findOne({}).sort({ pickupNum: -1 });

  const user = new User({
    username: id,
    displayName: name,
    pictureUrl: picture.data.url,
    pickupNum: prevUser ? prevUser.pickupNum + 1 : 1,
    fb: true,
  });

  await user.save();

  return user;
};

const updateFBUser = async (user: IUser, fbProfile: FBProfile) => {
  const { id, name, picture } = fbProfile;
  if (user.displayName === name && user.pictureUrl === picture.data.url) {
    return user;
  }

  return User.findOneAndUpdate(
    { username: id },
    { displayName: name, pictureUrl: picture.data.url },
    { new: true }
  );
};
