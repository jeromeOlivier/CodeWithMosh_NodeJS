const tryCatchBlock = require("../middleware/tryCatchBlock");
const auth = require("../middleware/auth-middleware");
const express = require("express");
const router = express.Router();
const { create } = require("../controllers/user-controller");

router.post("/", auth, tryCatchBlock(create));

module.exports = router;
