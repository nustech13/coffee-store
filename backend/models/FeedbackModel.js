import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    email :{
        type: String,
        minlength :10,
        required : true
    },
    content :{
        type: String,
        required : true
    },
    product :{
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Product'
    }
},{timestamps : true});

export const FeedbackModel = mongoose.model('Feedback',schema);