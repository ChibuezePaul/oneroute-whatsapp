const express = require("express");
const {logger} = require("./core/logger");
const {PORT} = require("./core/config");
const app = express();

app.listen(PORT, () => logger.info(`Oneroute Whatsapp Backend Running on ${PORT}...`));
