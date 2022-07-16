import path from "path";
import fs from "fs";
//third party
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
//developed
import { convertStrToNum } from "../utils/String";
import { LogColor } from "../constants/enums/log-color";

const envFileName = process.env.NODE_ENV
  ? `.env.${process.env.NODE_ENV}`
  : ".env";

console.log(LogColor.YELLOW);
console.log(`try to load ${envFileName} file`);

try {
  const pathToEnvFile = path.join(__dirname, envFileName).trim();
  //check if env file exist
  if (fs.existsSync(pathToEnvFile)) {
    //load environment vars
    const myEnv = dotenv.config({
      path: pathToEnvFile,
    });
    dotenvExpand.expand(myEnv);
    console.log(LogColor.GREEN);
    console.log("environment variables loaded successfully");
  } else {
    console.log(LogColor.RED);
    console.log(`${envFileName} file dosn't exists in the config folder`);
    console.log(`environment variables loading failed`);
    dotenv.config();
  }
} catch (error) {
  console.log(LogColor.RED);
  console.log("Error:");
  console.error(error);
}

console.log(LogColor.RESET);

const processEnvVars = process.env;

const config = {
  env: processEnvVars.env,

  // Port number
  PORT: (processEnvVars.PORT && convertStrToNum(processEnvVars.PORT)) || 3000,
  // Env host
  HOST: processEnvVars.HOST || "localhost",

  // URL of the Mongo DB
  MONGODB_URL: processEnvVars.MONGODB_URL,
  // JWT
  // JWT secret key
  JWT_SECRET: processEnvVars.JWT_SECRET,
  // Number of minutes after which an access token expires
  JWT_ACCESS_EXPIRATION_MINUTES:
    (processEnvVars.JWT_ACCESS_EXPIRATION_MINUTES &&
      convertStrToNum(processEnvVars.JWT_ACCESS_EXPIRATION_MINUTES)) ||
    30,
  // Number of days after which a refresh token expires
  JWT_REFRESH_EXPIRATION_DAYS:
    (processEnvVars.JWT_REFRESH_EXPIRATION_DAYS &&
      convertStrToNum(processEnvVars.JWT_REFRESH_EXPIRATION_DAYS)) ||
    30,
  // Number of minutes after which a reset password token expires
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES:
    (processEnvVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES &&
      convertStrToNum(processEnvVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES)) ||
    10,
  // Number of minutes after which a verify email token expires
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES:
    (processEnvVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES &&
      convertStrToNum(processEnvVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES)) ||
    10,

  // SMTP configuration options for the email service
  // For testing, you can use a fake SMTP service like Ethereal: https://ethereal.email/create
  SMTP_HOST: processEnvVars.SMTP_HOST,
  SMTP_PORT:
    (processEnvVars.SMTP_PORT && convertStrToNum(processEnvVars.SMTP_PORT)) ||
    587,
  SMTP_USERNAME: processEnvVars.SMTP_USERNAME,
  SMTP_PASSWORD: processEnvVars.SMTP_PASSWORD,
  EMAIL_FROM: processEnvVars.EMAIL_FROM,
};

console.log(config);

export default config;
