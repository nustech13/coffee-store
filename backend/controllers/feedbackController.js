import { FeedbackModel } from "../models/FeedbackModel.js";

export const feedbackController = {
    add: async (req, res)=>{
        try {
            const newFeedback = new FeedbackModel(req.body);
            const saveFeedback = await newFeedback.save();
            res.status(200).json(saveFeedback);
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
    }
}