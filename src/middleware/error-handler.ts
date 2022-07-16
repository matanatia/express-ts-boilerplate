import { Request, Response, NextFunction } from "express";
//third party
import mongoose from "mongoose";
//developed
import appLogger from "../services/app-logger";
import ApiError from "../models/api-error";
import { StatusCode } from "../constants/enums/status-codes";

const config = require("../config/config");

export const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error: ApiError;
  if (!(err instanceof ApiError)) {
    const statusCode =
      err.statusCode || err instanceof mongoose.Error
        ? StatusCode.BadRequest
        : StatusCode.InternalServerError;
    const message = err.message || "";
    error = new ApiError(statusCode, message, {
      isOperational: false,
      stack: err.stack,
    });
  } else {
    error = err;
  }
  next(error);
};

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message } = err;
  if (config.env === "production" && !err.isOperational) {
    statusCode = StatusCode.InternalServerError;
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === "development" && { stack: err.stack }),
  };

  if (config.env === "development") {
    appLogger.error(err);
  }

  res.status(statusCode).send(response);
};
