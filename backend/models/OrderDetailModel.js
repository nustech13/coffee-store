import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    quantity :{
        type:Number
    },
    order :{
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Order'
    },
    product :{
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Product'
    }
},{timestamps : true});

export const OrderDetailModel = mongoose.model('OrderDetail',schema);