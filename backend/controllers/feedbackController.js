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
    delete: async (req, res) =>{
        try {
            await FeedbackModel.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully!");
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
    },
    getByProductPage: async (req, res) => {
        const page = parseInt(req.body.page);
        const pageSize = parseInt(req.body.pageSize);
        const skipIndex = (page - 1) * pageSize;
        const result = {
            feedbacks:[],
            numberOfResult: '',
            offset: ''
        }
        try {
            result.feedbacks = await FeedbackModel.find({product: req.params.id});
            result.numberOfResult = result.feedbacks.length;
            result.feedbacks = await FeedbackModel.find({product: req.params.id})
            .limit(pageSize)
            .skip(skipIndex);
            result.offset = skipIndex;
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}