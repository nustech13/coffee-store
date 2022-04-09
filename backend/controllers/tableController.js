import { TableModel } from "../models/TableModel.js";

export const tableController = {
    add: async (req, res)=>{
        try {
            const newTable = new TableModel(req.body);
            const saveTable = await newTable.save();
            res.status(200).json(saveTable);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAll: async (req, res) =>{
        try {
            const tables = await TableModel.find();
            res.status(200).json(tables);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    update: async (req, res) =>{
        try {
            const table = await TableModel.findById(req.params.id);
            await table.updateOne({ $set: req.body});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    delete: async (req, res) =>{
        try {
            await TableModel.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getA: async (req, res) => {
        try {
            const table = await TableModel.findById(req.params.id);
            res.status(200).json(table);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
