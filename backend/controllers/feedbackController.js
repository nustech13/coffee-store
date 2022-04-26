import { FeedbackModel } from "../models/FeedbackModel.js";

export const feedbackController = {
    add: async (req, res)=>{
        try {
            const newFeedback = new FeedbackModel(req.body);
            await newFeedback.save();
            const feedbacks = await FeedbackModel.find({product: req.body.product});
            res.status(200).json([...feedbacks].reverse());
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAll: async (req, res) =>{
        try {
            const feedbacks = await FeedbackModel.find();
            res.status(200).json(feedbacks);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getByProduct: async (req, res) => {
        try {
            const feedbacks = await FeedbackModel.find({product: req.params.id});
            res.status(200).json([...feedbacks].reverse());
        } catch (error) {
            res.status(500).json(error);
        }
    }
}