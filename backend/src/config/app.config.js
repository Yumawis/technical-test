const { PORT, ALLOWED_CORS } = require("./app.config.json");

const appConfig = {
  port: PORT ?? 5001,
  allowedCORS: ALLOWED_CORS ?? [],
};

module.exports = { appConfig };
