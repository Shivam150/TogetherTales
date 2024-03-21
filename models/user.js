const mongoose = require( 'mongoose' );
let userSchema = new mongoose.Schema({
    fullName : {
        type: String,
    },
    email : {
        type:String,
        required : true,
    },
    password : {
        type: String,
        required: true
    },
    profileImage : {
        type: String,
        default : "/upload/1710688195502-MyProfile.jpg",
    },
    role: {
         type: String ,  // admin or user
         enum: ['admin', 'user'],
         default:'user'
    },
    isDeleted : {
        type : Boolean ,
        default : false
    },

}, {
    timestamps:true  //It will provide createdAt and updatedAt as a property of an object
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;