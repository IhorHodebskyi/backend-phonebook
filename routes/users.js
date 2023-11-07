const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  logout,
  getCurrent,
  updateAvatar,
} = require("../controllers/usersControllers");
const validateBody = require("../middlewares/validateBody");
const authenticate = require("../middlewares/authenticate");
const { singupSchema, loginSchema } = require("../schemas/usersSchemas");
const upload = require("../middlewares/upload");

router.post("/signup", validateBody(singupSchema), signup);
router.post("/login", validateBody(loginSchema), login);
router.post("/logout", authenticate, logout);
router.get("/current", authenticate, getCurrent);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  //   isSingleFileExist,
  //   resizeAvatar,
  updateAvatar
);

module.exports = router;
