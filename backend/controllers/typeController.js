import { TypeModel } from "../models/TypeModel.js"

export const typeController = {
    getAll: async (req, res) =>{
        try {
            const types = await TypeModel.find();
            res.status(200).json(types);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getA: async (req, res) => {
        try {
            const type = await TypeModel.findById(req.params.id);
            res.status(200).json(type);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};