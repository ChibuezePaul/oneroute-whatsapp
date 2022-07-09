const Message = require("../service/Message");
const { error, success } = require("../core/util/apiResponse");
const logger = require("../core/util/logger");

exports.initMessageConnection = async (req, res) => {
    try {
        const initDetails = await new Message(req.body).initWhatsappConnection();
        return success(res, initDetails);
    }catch(err) {
        logger.error("Error occurred at creating bank", err);
        return error(res, { code: err.code, message: err.message })
    }
}

exports.processWebhooks = async (req, res) =>{
    try {
        logger.info(`=== webhooks received ==== ${JSON.stringify(req.body)}`);
        return success(res, "webhooks received");
    }catch(err) {
        logger.error("Error occurred at creating bank", err);
        return error(res, { code: err.code, message: err.message })
    }
}
