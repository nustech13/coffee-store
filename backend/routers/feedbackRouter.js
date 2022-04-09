import express from "express";
import { feedbackController } from "../controllers/feedbackController.js";


const feedbackRouter = express.Router();


feedbackRouter.get('/', feedbackController.getAll);
feedbackRouter.get('/add', feedbackController.add);

export default feedbackRouter;