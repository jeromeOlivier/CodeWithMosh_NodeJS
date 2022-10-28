const auth = require("../middleware/auth-middleware");
const express = require("express");
const router = express.Router();
const {
  create,
  findById,
  findAll,
  update,
  deleteOne,
} = require("../controllers/movie-controller");

router.post("/", auth, create);
router.get("/", findAll);
router.get("/:id", findById);
router.put("/:id", auth, update);
router.delete("/:id", auth, deleteOne);

module.exports = router;
