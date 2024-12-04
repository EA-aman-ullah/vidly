import logger from "../utils/logging.js";

export default function (err, req, res, next) {
  logger.error(
    `${err.message}:\nMessage: ${err.message}\nStack:\n${err.stack}`
  );
  res.status(500).send("Something Failed.");
}
