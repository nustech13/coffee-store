import express from "express";
import { categoryController } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.get('/', categoryController.getAll);
categoryRouter.post('/', categoryController.getAllPageSize);
categoryRouter.post('/add', categoryController.add);
categoryRouter.put('/:id', categoryController.update);
categoryRouter.delete('/:id', categoryController.delete);
categoryRouter.get('/:id', categoryController.getA);
categoryRouter.post('/type/', categoryController.getByTypePage);
categoryRouter.get('/type/all', categoryController.getByType);
export default categoryRouter;