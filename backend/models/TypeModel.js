import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name : {
        type : String ,
        unique : true ,
        required : true
    }
},{timestamps : true});

export const TypeModel = mongoose.model('Type',schema);