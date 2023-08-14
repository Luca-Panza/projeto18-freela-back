import { Router } from "express";
import authRouter from "./auth.routes.js";
import plantsRouter from "./plants.routes.js";

const indexRouter = Router();

indexRouter.use(authRouter);
indexRouter.use(plantsRouter);

export default indexRouter;
