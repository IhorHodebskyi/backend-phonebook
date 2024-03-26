const services = require("../services/contactsServices");
const { ctrlWrapper } = require("../helpers");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const allContacts = await services.getAllContacts(owner);
  res.json(allContacts);
};

const postContact = async (req, res) => {
  const { _id: owner } = req.user;
  const data = req.body;
  const contact = await services.postContact(owner, data);
  res.json(contact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await services.deleteContact(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(result);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  if (!contactId) {
    res.status(400).json({ message: "ContactId is absent" });
    return;
  }
  const data = req.body;
  const result = await services.editContacts(contactId, data);
  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  postContact: ctrlWrapper(postContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
};
