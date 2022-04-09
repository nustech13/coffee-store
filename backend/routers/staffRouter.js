import express from "express";
import { staffController } from "../controllers/staffController.js";


const staffRouter = express.Router();

staffRouter.post('/', staffController.getAllPageSize);
staffRouter.get('/', staffController.getAll);
staffRouter.post('/add', staffController.add);
staffRouter.put('/:id', staffController.update);
staffRouter.delete('/:id', staffController.delete);
staffRouter.get('/:id', staffController.getA);


export default staffRouter;