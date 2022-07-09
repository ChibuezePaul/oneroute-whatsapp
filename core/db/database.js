const Sequelize = require("sequelize");
let { DATABASE_URL, NODE_ENV } = require("../config/configs");
const logger = require("../util/logger");
const getConnectionOptions = () => {
    if(NODE_ENV !== 'dev') {
        return {
            ssl: true,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        }
    }
    return {};
}

const db = new Sequelize(DATABASE_URL, getConnectionOptions());

db.authenticate()
  .then(() => logger.info("Connection has been established successfully."))
  .catch((error) => logger.error(`Unable to connect to the database: ${error}`, 500));

module.exports = db;
