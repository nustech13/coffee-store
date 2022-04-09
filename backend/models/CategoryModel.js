import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name : {
        type : String ,
        unique : true ,
        required : true
    },
    type :{
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Type'
    }
},{timestamps : true});

export const CategoryModel = mongoose.model('Category',schema);