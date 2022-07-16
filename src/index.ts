import express from "express";
//third party
import path from "path";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
//developed
import mainRouter from "./routes";
import ApiError from "./models/api-error";
import { StatusCode } from "./constants/enums/status-codes";
import { LogColor } from "./constants/enums/log-color";
import config from "./config/config";
import appLogger from "./services/app-logger";
//middlewares
import { apiLogger } from "./middleware/api-logger";
import { errorConverter, errorHandler } from "./middleware/error-handler";

const app = express();

// Init middlewares:

// set security HTTP headers
app.use(helmet());

// logger
app.use(apiLogger);

// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: false }));

// sanitize request data
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Set application route
app.use(mainRouter);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(StatusCode.NotFound, "Not found"));
});

// handle error
app.use(errorConverter, errorHandler);

const PORT = config.PORT;
const HOST = config.HOST;

app.listen(PORT, () => {
  console.log(LogColor.YELLOW);
  appLogger.log(`Server running at http://${HOST}:${PORT}/\n` + LogColor.RESET);
});
