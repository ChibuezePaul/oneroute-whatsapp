const MessageSchema = require('../model/Message');
const sandBoxClient = require("../integration/sandBoxClient");
const throwError = require("../core/util/errorHandler");

class Message {
    constructor(data) {
        this.data = data;
        this.errors = [];
    }

    async initWhatsappConnection() {
        if(!this.data) {
           throwError("url is required");
        }
        const webhookUrl = await sandBoxClient.initializeConnection(this.data);
        return {message: "Whatsapp Connection Initialized Successfully", "connectionUrl": webhookUrl};
    }
}

module.exports = Message;
