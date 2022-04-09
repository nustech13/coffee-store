import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    date : {
        type : String 
    },
    quantity :{
        type:Number
    },
    sum_price :{
        type: Number
    },
    description :{
        type: String
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