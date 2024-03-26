const { ctrlWrapper } = require("../helpers");
const services = require("../services/authServices");

const signUp = async (req, res) => {
  const { body } = req;
  const result = await services.signUp(body);
  res.status(201).json(result);
};

const login = async (req, res) => {
  const { body } = req;
  const result = await services.login(body);
  res.status(200).json(result);
};

const logout = async (req, res) => {
  const { user } = req;
  await services.logout(user);
  res.sendStatus(204);
};

const getCurrent = (req, res) => {
  const { name, email, avatar } = req.user;
  res.json({ name, email, avatar });
};

const updateAvatar = async (req, res) => {
  const { user } = req;
  const { file } = req;
  const result = await services.avatar(user, file);
  res.status(200).json(result);
};

module.exports = {
  signUp: ctrlWrapper(signUp),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateAvatar: ctrlWrapper(updateAvatar),
};
