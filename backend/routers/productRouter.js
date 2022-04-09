import express from "express";

import  {productController}  from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get('/', productController.getAll);
productRouter.post('/', productController.getAllPageSize);
productRouter.post('/add', productController.add);
productRouter.put('/:id', productController.update);
productRouter.delete('/:id', productController.delete);
productRouter.get('/:id', productController.getA);
productRouter.get('/detail/:id', productController.getAByName);
productRouter.get('/category/:id', productController.getByNameCategory);
productRouter.get('/type/:id', productController.getByNameType);
productRouter.post('/category/', productController.getByCategory);
productRouter.get('/search/:id', productController.getSearch);

export default productRouter;