const mongoose = require("mongoose");

let commentSchema = new  mongoose.Schema({
    content : { 
        type : String , 
        required : true 
    },

    createdBy : {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User'
    },

    blogId : {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Blog'
    },
    
}, {timestamps: true});

const CommentModel = mongoose.model("Comment", commentSchema);

module.exports = CommentModel;