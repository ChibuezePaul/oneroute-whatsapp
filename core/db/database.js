const Sequelize = require("sequelize");
let { DATABASE_URL } = require("../config/configs");
const logger = require("../util/logger");
const db = new Sequelize(DATABASE_URL);

db.authenticate()
  .then(() => logger.info("Connection has been established successfully."))
  .catch((error) => logger.error(`Unable to connect to the database: ${error}`, 500));

module.exports = db;
