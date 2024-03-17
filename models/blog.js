const mongoose = require('mongoose');
let blogSchema = new mongoose.Schema({

    title: { 
        type: String, 
        required: true 
    },
    content: {
        type: String, 
        required: true 
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type:String,
        default:""
    },
    isDeleted: {
        type: Boolean,
        default: false
    },

},{timestamps:true});

const Blog =   mongoose.model("Blog",blogSchema);

module.exports=Blog;