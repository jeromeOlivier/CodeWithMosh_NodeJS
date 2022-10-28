const auth = require("../middleware/auth-middleware");
const express = require("express");
const router = express.Router();

const { create, findAll } = require("../controllers/rental-controller");

router.post("/", auth, create);
router.get("/", findAll);

module.exports = router;
