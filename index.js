import express from "express";
import logger from "./app/utils/logging.js";
import routes from "./app/startup/routes.js";
import db from "./app/database/db.js";
import config from "./app/startup/config.js";
import validation from "./app/startup/validation.js";

const app = express();
// throw new Error("something failed");
config();
db();
validation();
routes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`listening on port ${port}...`));
