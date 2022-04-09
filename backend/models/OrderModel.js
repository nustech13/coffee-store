import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    
    sum_order :{
        type:Number
    },
    customer_name :{
        type: String
    },
    customer_phone :{
        type: String,
        minlength : 10
    },
    customer_address :{
        type: String
    },
    table :{
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Table'
    },
    status :{
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'OrderStatus'
    },
    staff :{
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Staff'
    }
},{timestamps : true});

export const OrderModel = mongoose.model('Order',schema);