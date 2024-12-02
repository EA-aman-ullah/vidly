const config = require("config");
// const logger = require("./logging");

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey in not defined.");
  }
};
