const Utility = require("../Utility/utility");
const blogModel = require("../models/blog");
const mongoose  = require('mongoose');
const commentModel = require("../models/comment");
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
        let blog = await blogModel.findById({_id: req.params._id}).populate('author');
        let comments = await commentModel.find({blogId : req.params._id }).populate("createdBy");
        console.log("One blog====:",blog);
        console.log("comments======: ", comments);
        return res.render("Blog", {
            user: req.user,
            blog,
            comments,
            moment: moment
        });
    } catch (error) {
        console.log(error);
        res.render("Blog", {error});
    }
}

const addComment = async (req,res) => {
    try {
        req.body.createdBy = req.user._id;
        req.body.blogId = req.params.blogId;
        let data = req.body;
        const comment = await commentModel.create(data);
        console.log("comment===========",comment);
        return res.redirect(`/blog/one-blog${req.params.blogId}`);
    } catch (error) {
        
    }
}







module.exports = {
    createBlog,
    getAllBlogs,
    getBlog,
    addComment,
}

// '/upload/1710692030370-BitBank_15_11zon.jpg',