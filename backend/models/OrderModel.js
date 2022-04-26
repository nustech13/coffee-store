import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    
    total :{
        type:Number
    },
    customerName :{
        type: String
    },
    customerPhone :{
        type: String,
        minlength : 10
    },
    customerAddress :{
        type: String
    },
    status :{
        type :Boolean ,
        default :false
    }
},{timestamps : true});

export const OrderModel = mongoose.model('Order',schema);