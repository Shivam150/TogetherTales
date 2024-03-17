const Utility = require("../Utility/utility");
const blogModel = require("../models/blog");
const mongoose  = require('mongoose');
const ObjectId  = mongoose.Types.ObjectId;

const moment = require('moment');


const createBlog = async  (req, res) => {
    try {
        // add auther name also  to the request body.
        console.log("userData====:",req.user._id);
        req.body.author = req.user._id;
        req.body.image = `/upload/${req.file.filename}`;
        console.log("req.body.author", req.body.author);
        console.log("req.body.image", req.body.image);
        let data = req.body;
        let blog = await blogModel.create(data);
        if(blog){
            return res.redirect("/");
        }

    } catch (error) {
        res.render("CreateBlog", {error});
    }
}

const  getAllBlogs = async (req,res)=> {
    try {
        let blogs = await blogModel.find({isDeleted:false});
        if(blogs){
            return blogs;
        }else {
            res.render("Home", {error: "No Blogs Found"});
        }
    } catch (error) {
        // res.render("Home", {error});
        console.log(error);
    }
}

// get blog by it 
const getBlog = async (req,res) => {
    try {
        console.log("params id===:", req.params._id);
        let blog = await blogModel.findById({_id: req.params._id});
        console.log("One blog====:",blog);
        return res.render("Blog", {
            user: req.user,
            blog,
            moment: moment
        });
    } catch (error) {
        console.log(error);
        res.render("Blog", {error});
    }
}







module.exports = {
    createBlog,
    getAllBlogs,
    getBlog,
}

// '/upload/1710692030370-BitBank_15_11zon.jpg',