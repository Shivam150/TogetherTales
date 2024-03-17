const blogRouter = require("express").Router();
const Middleware = require("../service/auth");

const controller = require("../controller/blog");

blogRouter.get("/add-blog", Middleware.userAuth, (req,res) => {
    res.render("CreateBlog", {
        user: req.user,
    })
});


blogRouter.post("/add-blog", Middleware.userAuth, controller.createBlog);






 
module.exports = blogRouter;