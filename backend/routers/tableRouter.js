import express from "express";
import {tableController} from "../controllers/tableController.js";

const tableRouter = express.Router();


tableRouter.get('/', tableController.getAll);
tableRouter.post('/add', tableController.add);
tableRouter.put('/:id', tableController.update);
tableRouter.delete('/:id', tableController.delete);
tableRouter.get('/:id', tableController.getA);


export default tableRouter;