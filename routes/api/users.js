const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");
const validateBody = require("../../middlewares/validateBody");
const authenticate = require("../../middlewares/authenticate");
const { singUpSchema, loginSchema } = require("../../schemas/usersSchemas");
const upload = require("../../middlewares/upload");

router.post("/signup", validateBody(singUpSchema), ctrl.signUp);
router.post("/login", validateBody(loginSchema), ctrl.login);
router.post("/logout", authenticate, ctrl.logout);
router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  //   isSingleFileExist,
  //   resizeAvatar,
  ctrl.updateAvatar
);

module.exports = router;
