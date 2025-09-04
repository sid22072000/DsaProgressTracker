const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/progress", auth, userController.getProgress);
router.post("/progress", auth, userController.updateProgress);

router.get("/me", auth, userController.getMe);
router.post("/logout", userController.logout);
module.exports = router;
