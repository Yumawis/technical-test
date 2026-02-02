const Fruits = require("../models/Fruits");

const registerFruit = async (req, res) => {
  try {
    const { name, description, photoBasde64 } = req.body;

    const newProduct = new Product({
      name,
      description,
      photoBasde64,
    });

    const savedFruit = await newProduct.save();

    console.log("Fruta registrada:", savedFruit);

    const response = {
      data: {
        message: "Fruta registrada correctamente",
        result: savedFruit,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    errorMessage = error.message;

    console.error("Error registrando la fruta");

    const response = {
      data: {
        message: "Ocurrió un error al registrar la fruta",
        error: errorMessage,
      },
    };

    return res.status(422).json(response);
  }
};


const getAllFruits = async (req, res) => {
  try {
    const fruits = await Fruits.aggregate([
      {
        $lookup: {
          from: "favoritefruits", // nombre real de la colección
          localField: "_id",
          foreignField: "fruitsId",
          as: "votes",
        },
      },
      {
        $addFields: {
          votesCount: {
            $cond: {
              if: { $gt: [{ $size: "$votes" }, 0] },
              then: { $size: { $arrayElemAt: ["$votes.users", 0] } },
              else: 0,
            },
          },
        },
      },
      {
        $project: {
          votes: 0, // ocultamos el array completo
        },
      },
    ]);

    return res.status(200).json({
      data: {
        message: "Frutas obtenidas correctamente",
        result: fruits,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener las frutas",
      error: error.message,
    });
  }
};

module.exports = { registerFruit, getAllFruits };
