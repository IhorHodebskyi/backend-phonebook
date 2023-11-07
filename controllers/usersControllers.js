const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
const gavatar = require("gravatar");

const User = require("../db/models/userModel");
const { ctrlWrapper } = require("../helpers");

const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({ message: "Email in use" });
    return;
  }
  const avatar = gavatar.url(email);
  const newUser = new User({ name, email, password, avatar });
  await newUser.hashPassword(password);
  await newUser.save();

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({ token, user: { name, email, avatar } });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);

  if (!user) {
    res.status(401).json({ message: "Email or password is wrong" });
    return;
  }
  const result = await user.verifyPassword(password);
  if (!result) {
    res.status(401).json({ message: "Email or password is wrong" });
    return;
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token, user: { name: user.name, email, avatar: user.avatar } });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.sendStatus(204);
};

const getCurrent = (req, res) => {
  const { name, email, avatar } = req.user;
  res.json({ name, email, avatar });
};

const updateAvatar = async (req, res, next) => {
  const avatarsDir = path.join(__dirname, "../", "public", "avatars");
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  try {
    await fs.rename(tempUpload, resultUpload);
  } catch (error) {
    fs.unlink(tempUpload);
    next(error);
  }
  const avatar = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatar });
  res.json({ avatar });
};

module.exports = {
  signup: ctrlWrapper(signup),
  login,
  logout,
  getCurrent,
  updateAvatar,
};
