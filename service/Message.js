const MessageSchema = require("../model/Message");
const sandBoxClient = require("../integration/sandBoxClient");
const throwError = require("../core/util/errorHandler");
const logger = require("../core/util/logger");
const {SANDBOX_NUMBER} = require("../core/config/configs");

class Message {
    constructor(data) {
        this.data = data;
        this.errors = [];
    }

    async initWhatsappConnection() {
        if (!this.data) {
            throwError("url is required");
        }
        const webhookUrl = await sandBoxClient.initializeConnection(this.data);
        return {
            message: "Whatsapp Connection Initialized Successfully",
            connectionUrl: webhookUrl,
        };
    }

    async sendMessage() {
        const {recipientNumber, message} = this.data;
        if (!recipientNumber || recipientNumber === "") {
            this.errors.push("recipientNumber is required");
        }

        if (!message || message === "") {
            this.errors.push("message is required");
        }

        if (this.errors.length) {
            throwError(this.errors);
        }

        const messageResponse = await sandBoxClient.sendMessage(
            recipientNumber,
            message
        );
        this.data = {from: SANDBOX_NUMBER, text: {body: message}, type: "SENT_MESSAGE"};
        await this.saveMessage();
        logger.info("send message response===>" + JSON.stringify(messageResponse));
        return "Whatsapp Message Sent Successfully";
    }

    async sendTemplateMessage() {
        const {recipientNumber} = this.data;
        if (!recipientNumber || recipientNumber === "") {
            this.errors.push("recipientNumber is required");
        }

        if (this.errors.length) {
            throwError(this.errors);
        }

        const messageResponse = await sandBoxClient.sendTemplateMessage(recipientNumber);
        this.data = {from: SANDBOX_NUMBER, text: {body: messageResponse.messages[0].id}, type: "TEMPLATE_MESSAGE"};
        await this.saveMessage();
        return "Whatsapp Message Template Sent Successfully";
    }

    async saveMessage() {
        const {from, text, type} = this.data;

        return await MessageSchema.create({
            sender: from,
            message: text.body,
            type: type
        });
    }

    static async findAllMessage() {
        return await MessageSchema.findAll();
    }
}

module.exports = Message;
