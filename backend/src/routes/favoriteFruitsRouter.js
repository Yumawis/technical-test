const express = require("express");
const router = express.Router();

const { addFavoriteFruits } = require("../controllers/favoriteController");

router.put("/product/:userId", addFavoriteFruits);

module.exports = router;
