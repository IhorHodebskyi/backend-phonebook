const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { handleMongooseError } = require("../../helpers");

const userSchema = new Schema(
  {
    name: { type: String, required: [true, "put your name"] },
    email: { type: String, required: [true, "put your number"] },
    password: { type: String, required: [true, "put your password"] },
    token: { type: String, default: "" },
    avatarURL: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.hashPassword = async function (password) {
  this.password = await bcrypt.hash(password, 10);
};

userSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;
