import express from "express";
import { customerController } from "../controllers/customerController.js";


const customerRouter = express.Router();

customerRouter.post('/', customerController.getAllPageSize);
customerRouter.get('/', customerController.getAll);
customerRouter.post('/add', customerController.add);
customerRouter.put('/:id', customerController.update);
customerRouter.delete('/:id', customerController.delete);
customerRouter.get('/:id', customerController.getA);


export default customerRouter;