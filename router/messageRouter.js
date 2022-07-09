const messageRouter = require("../core/config/routerConfig");
const messageController = require("../controller/messageController");
const validateAdminUser = require("../core/config/simpleAuth");

messageRouter.post("/init", validateAdminUser, messageController.initMessageConnection);

messageRouter.post("/webhook", messageController.processWebhooks);

module.exports = messageRouter;
