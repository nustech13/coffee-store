import { StaffModel } from "../models/StaffModel.js";

export const staffController = {
    add: async (req, res)=>{
        try {
            const newStaff = new StaffModel(req.body);
            const saveStaff = await newStaff.save();
            res.status(200).json(saveStaff);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAll: async (req, res) =>{
        try {
            const staffs = await StaffModel.find();
            res.status(200).json(staffs);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllPageSize: async (req, res) =>{
        const page = parseInt(req.body.page);
        const pageSize = parseInt(req.body.pageSize);
        const skipIndex = (page - 1) * pageSize;
        const result = {
            staffs:[],
            numberOfResult: '',
            offset: ''
        }
        try {
            result.staffs = await StaffModel.find();
            result.numberOfResult = result.staffs.length;
            result.staffs = result.staffs = await StaffModel.find()
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
            const staff = await StaffModel.findById(req.params.id);
            await staff.updateOne({ $set: req.body});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    delete: async (req, res) =>{
        try {
            await StaffModel.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getA: async (req, res) => {
        try {
            const staff = await StaffModel.findById(req.params.id);
            res.status(200).json(staff);
        } catch (error) {
            res.status(500).json(error);
        }
    },
   
}