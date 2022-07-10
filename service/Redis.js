const redis = require('redis');
const {REDIS_URL, REDIS_TIMEOUT, CONNECTION_TIMEOUT} = require('../core/config/configs');
const logger = require('../core/util/logger');

const redisClient = redis.createClient({url: REDIS_URL}, {connect_timeout: CONNECTION_TIMEOUT});
redisClient.connect()
    .then(() => logger.info("Redis connected successfully"))
    .catch(error => logger.error("Error connecting to redis", error));

exports.cacheData = (key, value) => {
    try {
        redisClient.setEx(key, REDIS_TIMEOUT, value);
    } catch (e) {
        logger.error("Error saving data to redis", e)
    }
}

exports.getCachedData = async (key) => {
    try {
        return await redisClient.get(key);
    } catch (e) {
        logger.error("Error retrieving data with key: " + key + "from redis", e)
    }
}

exports.deleteCachedData = (key) => {
    return redisClient.del(key)
}
