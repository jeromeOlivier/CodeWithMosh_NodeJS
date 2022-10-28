const tryCatchBlock = require("../middleware/tryCatchBlock");
const auth = require("../middleware/auth-middleware");
const express = require("express");
const router = express.Router();

const { create, findAll } = require("../controllers/rental-controller");

router.post("/", auth, tryCatchBlock(create));
router.get("/", tryCatchBlock(findAll));

module.exports = router;
