import { OrderStatusModel } from "../models/OrderStatusModel.js";

export const orderStatusController = {
    getAll: async (req, res) =>{
        try {
            const status = await OrderStatusModel.find();
            res.status(200).json(status);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getA: async (req, res) => {
        try {
            const status = await OrderStatusModel.findById(req.params.id);
            res.status(200).json(status);
        } catch (error) {
            res.status(500).json(error);
        }
    },
}