const express = require("express");
const router = express.Router();
const postersController = require("../controllers/postersController");

router.post("/", postersController.addNewPoster);
router.get("/:user", postersController.getUserPosters);

module.exports = router;
