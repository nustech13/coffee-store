import express from "express";
import { orderController } from "../controllers/orderController.js";


const orderRouter = express.Router();


orderRouter.get('/', orderController.getAll);
orderRouter.post('/add', orderController.add);
orderRouter.put('/:id', orderController.update);
orderRouter.delete('/:id', orderController.delete);
orderRouter.get('/:id', orderController.getA);
orderRouter.post('/status', orderController.getByStatus);
orderRouter.post('/', orderController.getAllPageSize);
export default orderRouter;