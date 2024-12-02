const winston = require("winston");
require("express-async-errors");
require("winston-mongodb");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "logfile.log", level: "error" }),

    new winston.transports.MongoDB({
      db: "mongodb://localhost/vidly",
      level: "error",
    }),
  ],
});

winston.exceptions.handle([
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.prettyPrint() // Format the log with color and simplicity
    ),
  }),
  new winston.transports.File({ filename: "uncaughtExceptions.log" }),
]);

winston.rejections.handle([
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.prettyPrint() // Format the log with color and simplicity
    ),
  }),
  new winston.transports.File({ filename: "unhandledRejections.log" }),
]);

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint()
      ),
    })
  );
}

module.exports = logger;
