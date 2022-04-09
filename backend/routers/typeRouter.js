import express from "express";
import { typeController } from "../controllers/typeController.js";

const typeRouter = express.Router();


typeRouter.get('/', typeController.getAll);
typeRouter.get('/:id', typeController.getA);

export default typeRouter;