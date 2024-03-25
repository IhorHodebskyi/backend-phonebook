const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");

const User = require("../db/models/userModel");
const { ctrlWrapper } = require("../helpers");
const services = require("../services/authServices");

const { SECRET_KEY } = process.env;

const signUp = async (req, res) => {
  const { body } = req;
  const result = await services.signUp(body);
  res.status(201).json(result);
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
  signUp: ctrlWrapper(signUp),
  login,
  logout,
  getCurrent,
  updateAvatar,
};
