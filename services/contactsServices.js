const Contact = require("../db/models/contactModel");

const getAllContacts = async (owner) => {
  const contacts = await Contact.find({ owner });
  return contacts;
};

const postContact = async (owner, data) => {
  const result = await Contact.create({ ...data, owner });
  return result;
};

const deleteContact = async (id) => {
  const result = await Contact.findByIdAndDelete(id);
  return result;
};

const editContacts = async (id, data) => {
  const result = await Contact.findByIdAndUpdate(id, data, { new: true });
  return result;
};

module.exports = {
  getAllContacts,
  postContact,
  deleteContact,
  editContacts,
};
