const Message = require("../service/Message");
const {error, success} = require("../core/util/apiResponse");
const logger = require("../core/util/logger");

exports.initMessageConnection = async (req, res) => {
    try {
        const initDetails = await new Message(req.body).initWhatsappConnection();
        return success(res, initDetails);
    } catch (err) {
        logger.error("Error occurred initializing connection", err);
        return error(res, {code: err.code, message: err.message});
    }
};

exports.receiveMessage = async (req, res) => {
    try {
        const messages = req.body;
        // messages[0].type = 'RECEIVED_MESSAGE';
        logger.info(`=== webhooks received ==== ${JSON.stringify(messages)}`);
        // const receivedMessage = await new Message(messages[0]).saveMessage();
        return success(res, "receivedMessage", "Whatsapp Saved Successfully");
    } catch (err) {
        logger.error("Error occurred processing message", err);
        return error(res, {code: err.code, message: err.message});
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const initDetails = await new Message(req.body).sendMessage();
        return success(res, initDetails);
    } catch (err) {
        logger.error("Error occurred sending message", err);
        return error(res, {code: err.code, message: err.message});
    }
};

exports.sendTemplateMessage = async (req, res) => {
    try {
        const initDetails = await new Message(req.body).sendTemplateMessage();
        return success(res, initDetails);
    } catch (err) {
        logger.error("Error occurred sending message", err);
        return error(res, {code: err.code, message: err.message});
    }
};

exports.getAllMessage = async (req, res) => {
    try {
        const messages = await Message.findAllMessage();
        return success(res, messages);
    } catch (err) {
        logger.error("Error occurred retrieving messages", err);
        return error(res, {code: err.code, message: err.message});
    }
};
