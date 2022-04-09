import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name : {
        type : String ,
        unique : true ,
        required : true
    },
    status : {
        type : Boolean,
        default : false 
    }
},{timestamps : true});

export const TableModel = mongoose.model('Table',schema);