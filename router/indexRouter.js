const indexRouter = require("../core/config/routerConfig");

indexRouter.get("/", (req, res) => res.status(200)
    .send("<code>OneRoute Whatsapp Backend Running...<a target=\"_blank\" href=\"https://documenter.getpostman.com/view/7021636/UzJPMEsq\" style=\"text-decoration: none; cursor: pointer; color: black; font-weight: bold\">&lt;Go To Docs/&gt;</a></code>"));

module.exports = indexRouter;
