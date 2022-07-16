import { Request, Response, NextFunction } from "express";
//third party
import { DateTime } from "luxon";

export const apiLogger = (req: Request, res: Response, next: NextFunction) => {
  const date = DateTime.now();
  console.log(
    `${req.method}  - ${req.protocol}://${req.get("host")}${
      req.originalUrl
    } -  ${date.toISO()}`
  );
  next();
};
