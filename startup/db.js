const logger = require("./logging");
const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/vidly")
    .then(() => logger.info("Connected to MongoDb..."))
    .catch((err) => logger.error("Could not connect to MongDB.", err));
};
