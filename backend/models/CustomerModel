import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name : {
        type : String ,
        required : true
    },
    email :{
        type:String,
        unique:true,
        required:true
    },
    password :{
        type:String,
        required :true,
        minlength : 6
    },
    phone :{
        type :String ,
        minlength : 10,
        unique :true
    },
    image :{
        type :String
    },
    
},{timestamps : true});

export const CustomerModel = mongoose.model('Customer',schema);