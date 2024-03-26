const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");
const User = require("../db/models/userModel");
const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const signUp = async ({ name, email, password }) => {
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const avatarURL = gravatar.url(email);
  const newUser = new User({ name, email, password, avatarURL });
  await newUser.hashPassword(password);
  await newUser.save();
  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(newUser._id, { token });
  return { token, user: { name, email, avatarURL } };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const result = await user.verifyPassword(password);

  if (!result) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  return { token, user: { name: user.name, email, avatar: user.avatar } };
};

const logout = async ({ _id }) => {
  await User.findByIdAndUpdate(_id, { token: "" });
};

const updateAvatar = async ({ _id, path: tempUpload, originalname }) => {
  const avatarsDir = path.join(__dirname, "../", "public", "avatars");
  const filename = `${_id}_${originalname}`;

  const img = await Jimp.read(tempUpload);
  img.resize(250, 250).writeAsync(tempUpload);

  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  return { avatarURL };
};

module.exports = { signUp, login, logout, updateAvatar };
