const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../../helpers");

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, "put your name"] },
    number: { type: String, required: [true, "put your number"] },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = Contact;
