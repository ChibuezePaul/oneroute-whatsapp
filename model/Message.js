const { DataTypes } = require('sequelize');
const db = require("../core/db/database");

const Message = db.define('Message', {
    sender: DataTypes.STRING,
    message: DataTypes.STRING,
    type: DataTypes.STRING
}, {
});

module.exports = Message;
