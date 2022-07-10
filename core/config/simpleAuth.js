const {error} = require('../util/apiResponse');
const {AUTH_KEY} = require("./configs");

const validateAdminUser = (req, res, next) => {
    const authKey = req.headers.auth_key;

    if (!authKey) {
        return error(res, {code: 401, message: 'Authentication Failed. Unauthorized User'}, 401);
    }

    if (authKey !== AUTH_KEY) {
        return error(res, {code: 401, message: 'Authentication Failed'}, 401);
    }
    next();
}

module.exports = validateAdminUser;
