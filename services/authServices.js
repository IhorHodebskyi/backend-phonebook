const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const User = require("../db/models/userModel");
const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const signUp = async ({ name, email, password }) => {
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const avatar = gravatar.url(email);
  const newUser = new User({ name, email, password, avatar });
  await newUser.hashPassword(password);
  await newUser.save();
  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(newUser._id, { token });
  return { token, user: { name, email, avatar } };
};

module.exports = { signUp };
