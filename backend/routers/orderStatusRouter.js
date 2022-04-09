import express from "express";
import { orderStatusController } from "../controllers/orderStatusController.js";


const orderStatusRouter = express.Router();


orderStatusRouter.get('/', orderStatusController.getAll);
orderStatusRouter.get('/:id', orderStatusController.getA);

export default orderStatusRouter;