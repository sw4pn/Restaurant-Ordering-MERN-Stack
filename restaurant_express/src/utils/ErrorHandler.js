import config from "../config/config.js";
import sendResponse from "./sendResponse.js";

/**
 * Create Error Helper function
 */

export const createError = (statusCode, errMessage) => {
  const error = new Error();
  error.status = statusCode;
  error.message = errMessage;

  return error;
};

/**
 * Handle 404 not found api endpoints
 */

export const notFoundHandler = (req, res, next) => {
  return next({
    success: false,
    status: 404,
    message: "Not Found.",
    stack: `No api request available at: ${req.originalUrl}`,
  });
};

/**
 * Handle all errors
 */

export const ErrorHandler = (err, req, res, next) => {
  const errStatusCode = err.status || 500;
  const errMessage = err.message || "Something went wrong!";

  const obj = {
    success: false,
    status: errStatusCode,
    message: errMessage,
    stack: config.isProduction ? undefined : err.stack,
  };

  // return sendResponse(req, res, errStatusCode, false, obj);
  return sendResponse(req, res, errStatusCode, false, errMessage, obj);
};
