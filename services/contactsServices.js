const Contact = require("../db/models/contactModel");

const getContactService = async (owner) => {
  const contacts = await Contact.find({ owner });
  return contacts;
};

const postContactService = async (owner, data) => {
  const result = await Contact.create({ ...data, owner });
  return result;
};

const deleteContactService = async (id) => {
  const result = await Contact.findByIdAndDelete(id);
  return result;
};

const editContactsService = async (id, data) => {
  const result = await Contact.findByIdAndUpdate(id, data, { new: true });
  return result;
};

module.exports = {
  getContactService,
  postContactService,
  deleteContactService,
  editContactsService,
};
