require("dotenv").config();

const { appConfig } = require("./config/app.config");

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const fruitsRouter = require("./routes/fruitsRouter");
const favoriteFruitsRouter = require("./routes/favoriteFruitsRouter");

const app = express();

const ALLOWED_CORS = appConfig.allowedCORS;
const PORT = appConfig.port;

app.use(
  cors({
    origin: ALLOWED_CORS,
    credentials: true,
  }),
);

app.use(express.json({ limit: "10mb" }));

connectDB();

const prefix = "/api/v1/technical-test";

app.use(`${prefix}/auth`, authRoutes);
app.use(`${prefix}/fruits`, fruitsRouter);
app.use(`${prefix}/favorite`, favoriteFruitsRouter);

app.listen(PORT, () => {
  console.log(
    "Servidor iniciado correctamente:",
    `http://localhost:${PORT}${prefix}`,
    ALLOWED_CORS,
  );
});
