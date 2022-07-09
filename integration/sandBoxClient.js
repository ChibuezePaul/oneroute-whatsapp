const axios = require("axios");
const {SANDBOX_BASE_URL, SANDBOX_API_KEY, CONNECTION_TIMEOUT} = require("../core/config/configs");
const logger = require("../core/util/logger");
const throwError = require("../core/util/errorHandler");

const getHeaders = () => {
    return {
        'D360-API-KEY': `${SANDBOX_API_KEY}`,
        'Content-Type': 'application/json'
    };
};

const axiosInstance = axios.create({
    baseURL: SANDBOX_BASE_URL,
    timeout: Number(CONNECTION_TIMEOUT),
    headers: getHeaders()
});

exports.initializeConnection = async (payload) => {
    try {
        const response = await axiosInstance.post('/v1/configs/webhook', payload);
        return response.data.url;
    } catch (e) {
        const {data, status} = e.response;
        const message = data && status === 400 ? data.message : 'Error Initializing Connection. Kindly Contact The Administrator';
        logger.error('Error Initializing Connection', e.response ? e.response.data : e);
        throwError(message, status || 500);
    }
}
