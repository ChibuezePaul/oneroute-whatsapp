const express = require('express');
const messageRouter = express.Router();
const messageController = require("../controller/messageController");
const validateAdminUser = require("../core/config/simpleAuth");

messageRouter.post("/init", validateAdminUser, messageController.initMessageConnection);

messageRouter.post("/receive-message", messageController.receiveMessage);

messageRouter.post("/send-message", messageController.sendMessage);

messageRouter.post("/send-template-message", messageController.sendTemplateMessage);

messageRouter.get("/", messageController.getAllMessage);

module.exports = messageRouter;
