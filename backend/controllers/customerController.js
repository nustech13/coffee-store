import { CustomerModel } from "../models/CustomerModel.js";

export const customerController = {
    add: async (req, res)=>{
        try {
            const newCustomer = new CustomerModel(req.body);
            const saveCustomer = await newCustomer.save();
            res.status(200).json(saveCustomer);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAll: async (req, res) =>{
        try {
            const Customers = await CustomerModel.find();
            res.status(200).json(Customers);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllPageSize: async (req, res) =>{
        const page = parseInt(req.body.page);
        const pageSize = parseInt(req.body.pageSize);
        const skipIndex = (page - 1) * pageSize;
        const result = {
            Customers:[],
            numberOfResult: '',
            offset: ''
        }
        try {
            result.Customers = await CustomerModel.find();
            result.numberOfResult = result.Customers.length;
            result.Customers = result.Customers = await CustomerModel.find()
            .limit(pageSize)
            .skip(skipIndex);
            result.offset = skipIndex;
            res.status(200).json(result);           
        } catch (error) {
            res.status(500).json(error);
        }
    },
    update: async (req, res) =>{
        try {
            const Customer = await CustomerModel.findById(req.params.id);
            await Customer.updateOne({ $set: req.body});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    delete: async (req, res) =>{
        try {
            await CustomerModel.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getA: async (req, res) => {
        try {
            const Customer = await CustomerModel.findById(req.params.id);
            res.status(200).json(Customer);
        } catch (error) {
            res.status(500).json(error);
        }
    },
   
}