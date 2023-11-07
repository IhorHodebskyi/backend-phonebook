const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: { type: String, reqired: [true, "put your name"] },
  number: { type: String, reqired: [true, "put your number"] },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});
const Contact = model("contact", schema);

module.exports = Contact;
