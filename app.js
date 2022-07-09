const express = require("express");
const logger = require("./core/util/logger");
const {PORT} = require("./core/config/configs");
require("./core/db/database");
const app = express();

app.use(express.json());
app.use("/", require("./router/indexRouter"));
app.use("/messages", require("./router/messageRouter"));

app.listen(PORT, () => logger.info(`Oneroute Whatsapp Backend Running on ${PORT}...`));
