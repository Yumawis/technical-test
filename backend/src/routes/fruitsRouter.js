const express = require("express");
const router = express.Router();

const {
  registerFruit,
  getAllFruits,
} = require("../controllers/fruitsController");

router.post("/", registerFruit);

router.get("/:userId", getAllFruits);

module.exports = router;
