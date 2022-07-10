require('dotenv').config();

module.exports = {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT || 5000,
    CONNECTION_TIMEOUT: process.env.CONNECTION_TIMEOUT,
    SANDBOX_BASE_URL: process.env.SANDBOX_BASE_URL,
    SANDBOX_API_KEY: process.env.SANDBOX_API_KEY,
    REDIS_URL: process.env.REDIS_URL,
    REDIS_TIMEOUT: process.env.REDIS_TIMEOUT,
    AUTH_KEY: process.env.AUTH_KEY,
    SANDBOX_NUMBER: process.env.SANDBOX_NUMBER,
    NODE_ENV: process.env.NODE_ENV,
};
