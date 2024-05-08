const express = require("express");
const router = express.Router();
const postersController = require("../controllers/postersController");

router.get("/", postersController.getAllProdaj);

module.exports = router;
