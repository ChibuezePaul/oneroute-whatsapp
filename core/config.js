require('dotenv').config();

module.exports = {
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT || 5000,
  CONNECTION_TIMEOUT: process.env.CONNECTION_TIMEOUT,
  SANDBOX_BASE_URL: process.env.SANDBOX_BASE_URL,
  SANDBOX_API_KEY: process.env.SANDBOX_API_KEY,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_URL: process.env.REDIS_URL
};
