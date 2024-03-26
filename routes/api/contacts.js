const express = require("express");
const ctrl = require("../../controllers/contactsControllers");
const router = express.Router();
const authenticate = require("../../middlewares/authenticate");
const validateBody = require("../../middlewares/validateBody");
const { addSchema } = require("../../schemas/contactsSchema");

router.get("/", authenticate, ctrl.getAllContacts);

router.post("/", authenticate, validateBody(addSchema), ctrl.postContact);

router.delete("/:contactId", authenticate, ctrl.deleteContact);

router.put(
  "/:contactId",
  authenticate,
  validateBody(addSchema),
  ctrl.updateContact
);

module.exports = router;
