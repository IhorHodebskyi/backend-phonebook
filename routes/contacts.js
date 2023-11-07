const express = require("express");
const {
  getAllContacts,
  postContact,
  deleteContact,
  updateContact,
} = require("../controllers/contactsControllers");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const validateBody = require("../middlewares/validateBody");
const { addSchema } = require("../schemas/contactsShema");

router.get("/", authenticate, getAllContacts);

router.post("/", authenticate, validateBody(addSchema), postContact);

router.delete("/:contactId", authenticate, deleteContact);

router.put("/:contactId", authenticate, validateBody(addSchema), updateContact);

module.exports = router;
