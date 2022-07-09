const { DataTypes } = require('sequelize');
const db = require("../core/db/database");

const Message = db.define('Message', {
    sender: {
        type: DataTypes.STRING
    },
    sentMessage: {
        type: DataTypes.STRING
    },
    receivedMessage: {
        type: DataTypes.STRING
    },
}, {
});

module.exports = Message;
