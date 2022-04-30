import { ProductModel } from "../models/ProductModel.js";
import { CategoryModel } from "../models/CategoryModel.js";
import { TypeModel } from "../models/TypeModel.js"

function removeAccents(str) {
    return str.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}
export const productController = {

    add: async (req, res)=>{
        try {
            const newProduct = new ProductModel(req.body);
            const saveProduct = await newProduct.save();
            res.status(200).json(saveProduct);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAll: async (req, res) =>{
        try {
            const products = await ProductModel.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getSearch: async (req, res) =>{
        try {
            const products = await ProductModel.find().populate('categories');
            const listSearch = products.filter((item)=>{
                return String(item.name).trim().toLocaleLowerCase().search(String(req.params.id).trim().toLocaleLowerCase()) > -1;
            })
            res.status(200).json(listSearch);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllPageSize: async (req, res) =>{
        const page = parseInt(req.body.page);
        const pageSize = parseInt(req.body.pageSize);
        const skipIndex = (page - 1) * pageSize;
        const result = {
            products:[],
            numberOfResult: '',
            offset: ''
        }
        try {
            result.products = await ProductModel.find().populate('categories');
            result.numberOfResult = result.products.length;
            result.products = await ProductModel.find().populate('categories')
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
            const product = await ProductModel.findById(req.params.id);
            await product.updateOne({ $set: req.body});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    delete: async (req, res) =>{
        try {
            await ProductModel.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getA: async (req, res) => {
        try {
            const product = await ProductModel.findById(req.params.id).populate("categories");
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAByName: async (req, res) => {
        try {
            const products = await ProductModel.find().populate('categories');
            const product = products.filter((item) =>{
                var name = new String(removeAccents(item.name)).toLowerCase().trim().replace(/ /g,"-");
                return name === req.params.id;
            })
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getByNameCategory: async (req, res) => {
        try {
            const categories = await CategoryModel.find().populate('type');
            const category = categories.filter((item) =>{
                var name = new String(removeAccents(item.name)).toLowerCase().trim().replace(/ /g,"-");
                return name === req.params.id;
            });
            const products = await ProductModel.find({categories: category[0]._id}).populate('categories');
            res.status(200).json(products);
            
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getByNameType: async (req, res) => {
        try {
            const types = await TypeModel.find();
            const type = types.filter((item) =>{
                var name = new String(removeAccents(item.name)).toLowerCase().trim().replace(/ /g,"-");
                return name === req.params.id;
            })
            if(type.length > 0){
                const products = await ProductModel.find().populate('categories');
                const listProduct = products.filter((item)=>{
                    return new String(type[0]._id).trim() === new String(item.categories.type).trim();
                })
                res.status(200).json(listProduct);
             }else{
                 res.status(200).json([]);
             }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getByCategory: async (req, res) =>{
        const page = parseInt(req.body.page);
        const pageSize = parseInt(req.body.pageSize);
        const skipIndex = (page - 1) * pageSize;
        const result = {
            products:[],
            numberOfResult: '',
            offset: ''
        }
        try {
            result.products = await ProductModel.find({categories: req.body.id}).populate('categories');
            result.numberOfResult = result.products.length;
            result.products = await ProductModel.find({categories: req.body.id}).populate('categories')
            .limit(pageSize)
            .skip(skipIndex);
            result.offset = skipIndex;
            res.status(200).json(result);            
        } catch (error) {
            res.status(500).json(error);
        }
    }
};



