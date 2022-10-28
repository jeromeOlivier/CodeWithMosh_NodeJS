const tryCatchBlock = require("../middleware/tryCatchBlock");
const auth = require("../middleware/auth-middleware");
const admin = require("../middleware/admin-middleware");
const express = require("express");
const router = express.Router();
const {
  create,
  findById,
  findAll,
  update,
  deleteOne,
} = require("../controllers/customer-controller");

router.post("/", auth, tryCatchBlock(create));
router.get("/", tryCatchBlock(findAll));
router.get("/:id", tryCatchBlock(findById));
router.put("/:id", auth, tryCatchBlock(update));
router.delete("/:id", [auth, admin], tryCatchBlock(deleteOne));

module.exports = router;
