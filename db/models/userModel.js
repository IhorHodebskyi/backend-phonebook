const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userShema = new Schema(
  {
    name: { type: String, reqired: [true, "put your name"] },
    email: { type: String, reqired: [true, "put your number"] },
    password: { type: String, reqired: [true, "put your number"] },
    token: { type: String, default: "" },
    avatar: String,
  },
  { versionKey: false }
);

userShema.methods.hashPassword = async function (password) {
  this.password = await bcrypt.hash(password, 10);
};

userShema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("user", userShema);

module.exports = User;
