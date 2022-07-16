import { Router } from "express";
import { StatusCode } from "../../constants/enums/status-codes";
const router = Router();

// check the server is up and running
router.get("/", (req, res) => {
  res
    .status(StatusCode.Success)
    .send({ data: "healthcheck for express server" });
});

// check error heandler in server
router.get("/error", (req, res, next) => {
  try {
    throw new Error("basic error message");
  } catch (err) {
    next(err);
  }
});

export default router;
