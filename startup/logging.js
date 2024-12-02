const winston = require("winston");
require("express-async-errors");
require("winston-mongodb");

// Winston Logger Configuration
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // Log in JSON format
  ),
  transports: [
    // Log regular messages to a file
    new winston.transports.File({ filename: "logfile.log" }),
    // Log errors to MongoDB
    new winston.transports.MongoDB({
      db: "mongodb://localhost/vidly",
      level: "error",
    }),
  ],
});

// Handle uncaught exceptions
winston.exceptions.handle(
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
);

// Handle unhandled promise rejections
winston.rejections.handle(
  new winston.transports.File({ filename: "unhandledRejections.log" })
);

// Console transport for development
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

module.exports = logger;
