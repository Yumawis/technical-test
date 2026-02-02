const User = require("../models/User");
const Fruits = require("../models/Fruits");
const FavoriteFruits = require("../models/FavoriteFruits");

const addFavoriteFruits = async (req, res) => {
  try {
    const { userId } = req.params;
    const { fruitsId } = req.body;

    const userExists = await User.exists({ _id: userId });

    if (!userExists) {
      return res.status(404).json({
        data: { message: "El usuario no existe" },
      });
    }

    const fruits = await Fruits.findOne({ _id: fruitsId });

    if (!fruits) {
      return res.status(404).json({
        data: { message: "Fruta no encontrada" },
      });
    }

    await FavoriteFruits.updateOne(
      { fruitsId },
      { $setOnInsert: { fruitsId } },
      { upsert: true },
    );

    const favoriteFruit = await FavoriteFruits.findOneAndUpdate(
      {
        fruitsId,
        users: { $ne: userId },
      },
      {
        $addToSet: { users: userId },
      },
      { new: true },
    );

    if (!favoriteFruit) {
      return res.status(400).json({
        data: { message: "Ya guardaste esta fruta en favoritos" },
      });
    }

    console.log("Producto agregado:", favoriteFruit);

    const response = {
      data: {
        message: "Frutsa agregada a favoritos",
        result: favoriteFruit,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    errorMessage = error.message;

    console.error("Error agregando la fruta a favoritos", errorMessage);

    const response = {
      data: {
        message: "Ocurrió un error agregando la fruta a favoritos",
        error: errorMessage,
      },
    };

    return res.status(422).json(response);
  }
};

module.exports = { addFavoriteFruits };
