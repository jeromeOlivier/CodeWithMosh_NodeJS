const tryCatchBlock = require("../middleware/tryCatchBlock");
const express = require("express");
const router = express.Router();
const { create } = require("../controllers/auth-controller");

router.post("/", tryCatchBlock(create));

module.exports = router;
