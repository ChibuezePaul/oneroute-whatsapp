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
