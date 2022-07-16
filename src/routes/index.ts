import { Router } from "express";
const router = Router();

import herosRouter from "./api/example/heros";
import membersRouter from "./api/example/members";
import healthCheckRouter from "./healthCheck";

// Members API Routes
router.use("/api/members", membersRouter);
// Heros API Routes
router.use("/api/heros", herosRouter);
// healthcheck API Routes
router.use("/healthcheck", healthCheckRouter);

export default router;
