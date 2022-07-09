const Sequelize = require("sequelize");
let { DB_URI } = require("../config/configs");
const logger = require("../util/logger");

const db = new Sequelize(DB_URI);
db.authenticate()
  .then(() => logger.info("Connection has been established successfully."))
  .catch((error) => logger.error(`Unable to connect to the database: ${error}`, 500));

module.exports = db;
