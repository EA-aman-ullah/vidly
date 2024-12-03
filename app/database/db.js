import mongoose from "mongoose";
import logger from "../utils/logging.js";

export default function () {
  mongoose
    .connect("mongodb://localhost/vidly")
    .then(() => logger.info("Connected to MongoDb..."));
}
