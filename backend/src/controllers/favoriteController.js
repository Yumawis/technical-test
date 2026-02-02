const User = require("../models/User");
const Fruits = require("../models/Fruits");
const FavoriteFruits = require("../models/FavoriteFruits");

const addFavoriteFruits = async (req, res) => {
  try {
    const { userId } = req.params;
    const { fruitsId, comment } = req.body;

    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({
        data: { message: "El usuario no existe" },
      });
    }

    const fruitExists = await Fruits.exists({ _id: fruitsId });
    if (!fruitExists) {
      return res.status(404).json({
        data: { message: "Fruta no encontrada" },
      });
    }

    await FavoriteFruits.updateOne(
      { fruitsId },
      { $setOnInsert: { fruitsId } },
      { upsert: true }
    );

    const favoriteFruit = await FavoriteFruits.findOneAndUpdate(
      {
        fruitsId,
        "users.userId": { $ne: userId },
      },
      {
        $addToSet: {
          users: {
            userId,
            comment: comment || null,
          },
        },
      },
      { new: true }
    );

    if (!favoriteFruit) {
      return res.status(400).json({
        data: { message: "Ya guardaste esta fruta en favoritos" },
      });
    }

    return res.status(200).json({
      data: {
        message: "Fruta agregada a favoritos",
        result: favoriteFruit,
      },
    });
  } catch (error) {
    return res.status(422).json({
      data: {
        message: "Ocurrió un error agregando la fruta a favoritos",
        error: error.message,
      },
    });
  }
};


module.exports = { addFavoriteFruits };
