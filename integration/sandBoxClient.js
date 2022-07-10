const axios = require("axios");
const {
    SANDBOX_BASE_URL,
    SANDBOX_API_KEY,
    CONNECTION_TIMEOUT,
} = require("../core/config/configs");
const logger = require("../core/util/logger");
const throwError = require("../core/util/errorHandler");

const getHeaders = () => {
    return {
        "D360-API-KEY": `${SANDBOX_API_KEY}`,
        "Content-Type": "application/json",
    };
};

const axiosInstance = axios.create({
    baseURL: SANDBOX_BASE_URL,
    timeout: Number(CONNECTION_TIMEOUT),
    headers: getHeaders(),
});

exports.initializeConnection = async (payload) => {
    try {
        const response = await axiosInstance.post("/v1/configs/webhook", payload);
        return response.data.url;
    } catch (e) {
        logger.error("Error Initializing Connection. Kindly Contact The Administrator", e);
        throwError("Error Initializing Connection. Kindly Contact The Administrator", 500);
    }
};

exports.sendMessage = async (recipientNumber, message) => {
    try {
        const payload = {
            recipient_type: "individual",
            to: recipientNumber,
            type: "text",
            text: {
                body: message,
            },
        };
        const response = await axiosInstance.post("/v1/messages", payload);
        return response.data;
    } catch (e) {
        logger.error("Error Sending Message", e);
        throwError("Error Sending Message. Kindly Contact The Administrator", 500);
    }
};

exports.sendTemplateMessage = async (recipientNumber, message) => {
    try {
        const payload = {
            to: recipientNumber,
            type: "template",
            template: {
                namespace: "c8ae5f90_307a_ca4c_b8f6_d1e2a2573574",
                language: {
                    policy: "deterministic",
                    code: "en",
                },
                name: "disclaimer",
            },
        };
        const response = await axiosInstance.post("/v1/messages", payload);
        return response.data;
    } catch (e) {
        logger.error("Error Sending Template Message", e);
        throwError("Error Sending Template Message. Kindly Contact The Administrator", 500);
    }
};
