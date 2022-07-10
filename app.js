const express = require("express");
const logger = require("./core/util/logger");
const {PORT} = require("./core/config/configs");
require("./core/db/database");
const app = express();

app.use(express.json());
app.use("/messages", require("./router/messageRouter"));

app.get("/", (req, res) => res.status(200)
    .send("<code>OneRoute Whatsapp Backend Running...<a target=\"_blank\" href=\"https://documenter.getpostman.com/view/7021636/UzJPMEsq\" style=\"text-decoration: none; cursor: pointer; color: black; font-weight: bold\">&lt;Go To Docs/&gt;</a></code>"));

app.listen(PORT, () => logger.info(`Oneroute Whatsapp Backend Running on ${PORT}...`));
