const express = require("express");
const router = express.Router();
const { create, findAll } = require("../controllers/rental-controller");

router.post("/", create);
router.get("/", findAll);

module.exports = router;
