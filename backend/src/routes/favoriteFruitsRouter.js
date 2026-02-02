const express = require("express");
const router = express.Router();

const { addFavoriteFruits } = require("../controllers/favoriteController");

router.post("/fruits/:userId", addFavoriteFruits);

module.exports = router;
