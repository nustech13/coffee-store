import express from "express";
import { orderDetailController } from "../controllers/orderDetailController.js";


const orderDetailRouter = express.Router();


orderDetailRouter.get('/', orderDetailController.getAll);
orderDetailRouter.post('/add', orderDetailController.add);
orderDetailRouter.put('/:id', orderDetailController.update);
orderDetailRouter.delete('/:id', orderDetailController.delete);
orderDetailRouter.get('/:id', orderDetailController.getA);
orderDetailRouter.post('/order/:id', orderDetailController.getByOrder);

export default orderDetailRouter;