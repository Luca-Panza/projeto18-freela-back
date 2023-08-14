import { Router } from "express";
import { getAllPlants, BuyPlant, getMyplants, addPlant, editPlant } from "../controllers/plant.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateAuth } from "../middlewares/validateAuth.js";
import { plantSchema } from "../schemas/plant.schema.js";

const plantsRouter = Router();

plantsRouter.get("/Home", validateAuth, getAllPlants);
plantsRouter.put("/Home", validateAuth, BuyPlant);
plantsRouter.get("/Myplants", validateAuth, getMyplants);
plantsRouter.post("/Myplants", validateAuth, editPlant);
plantsRouter.post("/AddPlant", validateAuth, validateSchema(plantSchema), addPlant);

export default plantsRouter;
