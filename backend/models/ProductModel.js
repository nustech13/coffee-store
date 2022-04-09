import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name : {
        type : String ,
        required : true,
        unique : true
    },
    price :{
        type:Number
    },
    sale :{
        type:Number
    },
    description :{
        type: String
    },
    image :{
        type :String
    },
    categories :{
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Category'
    }
},{timestamps : true});

export const ProductModel = mongoose.model('Product',schema);