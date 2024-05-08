const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.get("/:user", userController.getSpecificUser);
router.post("/:user", userController.updateUser);

module.exports = router;
