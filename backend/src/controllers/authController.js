const User = require("../models/User");

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, nickname } = req.body;

    const existingUser = await User.findOne({ nickname });

    if (existingUser) {
      return res.status(400).json({
        data: {
          message: "El nombre de usuario ya se encuentra registrado",
        },
      });
    }

    const newUser = new User({
      firstName,
      lastName,
      nickname,
    });

    const savedUser = await newUser.save();
    const currentUser = { id: savedUser._id };

    console.log("Usuario creado correctamente", currentUser);

    const response = {
      data: {
        message: "Usuario registrado correctamente",
        result: currentUser,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    const errorMessage = error.message;

    console.error("Error al registrar el usuario", errorMessage);

    const response = {
      data: {
        message: "Ocurrió un error al registrar el usuario",
        error: errorMessage,
      },
    };

    return res.status(422).json(response);
  }
};

const login = async (req, res) => {
  try {
    const { nickname } = req.body;

    const user = await User.findOne({ nickname });

    if (!user) {
      return res.status(404).json({
        data: {
          message: "Usuario no encontrado",
        },
      });
    }

    console.log("Inicio de sesión:", nickname);

    const response = {
      data: {
        message: "Inicio de sesión exitoso",
        result: {
          id: user._id,
          nickname: user.nickname,
        },
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    const errorMessage = error.message;

    console.error("Error iniciando sesión", errorMessage);

    const response = {
      data: {
        message: "Ocurrió un error al iniciar sesión",
        error: errorMessage,
      },
    };

    return res.status(422).json(response);
  }
};

module.exports = { signUp, login };
