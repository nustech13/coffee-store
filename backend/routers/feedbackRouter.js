import express from "express";
import { feedbackController } from "../controllers/feedbackController.js";


const feedbackRouter = express.Router();


feedbackRouter.get('/', feedbackController.getAll);
feedbackRouter.post('/add', feedbackController.add);
feedbackRouter.get('/:id', feedbackController.getByProduct);
export default feedbackRouter;