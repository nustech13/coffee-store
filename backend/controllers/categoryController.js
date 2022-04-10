import { CategoryModel } from "../models/CategoryModel.js";
import { TypeModel } from "../models/TypeModel.js"
function removeAccents(str) {
    return str.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}
export const categoryController = {
    add: async (req, res)=>{
        try {
            const newCategory = new CategoryModel(req.body);
            const saveCategory = await newCategory.save();
            res.status(200).json(saveCategory);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAll: async (req, res) =>{
        try {
            const categories = await CategoryModel.find();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllPageSize: async (req, res) =>{
        const page = parseInt(req.body.page);
        const pageSize = parseInt(req.body.pageSize);
        const skipIndex = (page - 1) * pageSize;
        const result = {
            categories:[],
            numberOfResult: '',
            offset: ''
        }
        try {
            
            result.categories = await CategoryModel.find().populate('type');
            result.numberOfResult = result.categories.length;
            result.categories = result.categories = await CategoryModel.find().populate('type')
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
            const category = await CategoryModel.findById(req.params.id);
            await category.updateOne({ $set: req.body});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    delete: async (req, res) =>{
        try {
            await CategoryModel.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getA: async (req, res) => {
        try {
            const category = await CategoryModel.findById(req.params.id).populate("type");
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getByType: async (req, res) => {
        try {
            const types = await TypeModel.find();
            const result = {
                drinks:[],
                foods: []
            }
            result.drinks = await CategoryModel.find({type: types[0]._id}).populate('type');
            result.foods = await CategoryModel.find({type: types[1]._id}).populate('type');
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getByTypePage: async (req, res) =>{
        const page = parseInt(req.body.page);
        const pageSize = parseInt(req.body.pageSize);
        const skipIndex = (page - 1) * pageSize;
        const result = {
            categories:[],
            numberOfResult: '',
            offset: ''
        }
        try {
            result.categories = await CategoryModel.find({type: req.body.id}).populate('type');
            result.numberOfResult = result.categories.length;
            result.categories = result.categories = await CategoryModel.find({type: req.body.id}).populate('type')
            .limit(pageSize)
            .skip(skipIndex);
            result.offset = skipIndex;
            res.status(200).json(result);            
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
};