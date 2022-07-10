const redis = require("../service/Redis");
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
        this.data = {from: SANDBOX_NUMBER, text: message, type: "SENT_MESSAGE"};
        await this.saveMessage();
        logger.info("send message response===>" + JSON.stringify(messageResponse));
        return "Whatsapp Message Sent Successfully";
    }

    async sendTemplateMessage() {
        const {recipientNumber} = this.data;
        if (!recipientNumber || recipientNumber === "") {
            throwError("recipientNumber is required");
        }

        const messageResponse = await sandBoxClient.sendTemplateMessage(recipientNumber);
        this.data = {from: SANDBOX_NUMBER, text: messageResponse.messages[0].id, type: "TEMPLATE_MESSAGE"};
        await this.saveMessage();
        return "Whatsapp Template Message Sent Successfully";
    }

    async saveMessage() {
        const {from, text, type} = this.data;

        const savedMessage = await MessageSchema.create({
            sender: from,
            message: text,
            type: type
        });
        redis.deleteCachedData("messages");
        return savedMessage;
    }

    static async findAllMessage() {
        const cachedData = await redis.getCachedData("messages");
        if(cachedData){
            return JSON.parse(cachedData);
        }
        const messages = await MessageSchema.findAll();
        redis.cacheData("messages", JSON.stringify(messages));
        return messages;
    }
}

module.exports = Message;
