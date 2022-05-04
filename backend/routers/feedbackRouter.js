import express from "express";
import { feedbackController } from "../controllers/feedbackController.js";


const feedbackRouter = express.Router();


feedbackRouter.get('/', feedbackController.getAll);
feedbackRouter.post('/add', feedbackController.add);
feedbackRouter.delete('/:id', feedbackController.delete);
feedbackRouter.get('/:id', feedbackController.getByProduct);
feedbackRouter.post('/product/:id', feedbackController.getByProductPage);
export default feedbackRouter;