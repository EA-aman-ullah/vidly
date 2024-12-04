import winston from "winston";
import "express-async-errors";
import "winston-mongodb";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      return stack
        ? `${timestamp} [${level}]: ${message}\nStack Trace: ${stack}` // If there's a stack trace
        : `${timestamp} [${level}]: ${message}`; // If no stack trace
    })
  ),
  transports: [
    new winston.transports.File({ filename: "logfile.log", level: "error" }),

    new winston.transports.MongoDB({
      db: "mongodb://localhost/vidly",
      level: "error",
    }),
  ],
});

winston.exceptions.handle(
  new winston.transports.Console(),
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
);

winston.rejections.handle(
  new winston.transports.Console(),
  new winston.transports.File({ filename: "unhandledRejections.log" })
);

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

export default logger;
