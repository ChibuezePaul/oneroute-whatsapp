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
    const { recipientNumber, message } = this.data;
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

    //     contacts: [ { input: '2348117110843', wa_id: '2348117110843' } ],
    //         messages: [ { id: 'gBGHI0gRcRCEPwIJFJCZODDgr5o_' } ],
    //         meta: { api_status: 'stable', version: '2.41.2' }
    // }
    return "Whatsapp Message Sent Successfully";
  }

  async sendTemplateMessage() {
    const { recipientNumber, message } = this.data;
    if (!recipientNumber || recipientNumber === "") {
      this.errors.push("recipientNumber is required");
    }

    if (this.errors.length) {
      throwError(this.errors);
    }

    const messageResponse = await sandBoxClient.sendTemplateMessage(
      recipientNumber,
      message
    );
    return "Whatsapp Message Template Sent Successfully";
  }

  //   {
  //     "messages": [
  //         {
  //             "from": "2348117110843",
  //             "id": "ABGHI0gRcRCEPwIQ3EF-RubC-re6DWf0_dDPjA",
  //             "text": {
  //                 "body": "Bubble blue baby"
  //             },
  //             "timestamp": "1657381198",
  //             "type": "text"
  //         }
  //     ],
  //     "contacts": [
  //         {
  //             "profile": {
  //                 "name": "I"
  //             },
  //             "wa_id": "2348117110843"
  //         }
  //     ]
  // }"}
  async saveMessage() {
    const { from, text, type } = this.data;

    const message = await MessageSchema.create({
      sender: from,
      message: text.body,
      type: type
    });
    logger.info("saved message====>"+message);
    return message;
  }
}

module.exports = Message;
