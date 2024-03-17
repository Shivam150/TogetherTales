const blogRouter = require("express").Router();
const Middleware = require("../service/auth");
const path = require( "path" );
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/upload/`));
    },
    filename: function (req, file, cb) {
       const filename = `${Date.now()}-${file.originalname}`;  //Appending timestamp to the original filename.
       cb(null, filename);
    },
  });

  const upload = multer({ storage: storage })

const controller = require("../controller/blog");

blogRouter.get("/add-blog", Middleware.userAuth, (req,res) => {
    res.render("CreateBlog", {
        user: req.user,
    })
});


blogRouter.post("/add-blog", Middleware.userAuth, upload.single("image") , controller.createBlog);
// get blog by id 
blogRouter.get('/one-Blog:_id',Middleware.userAuth, controller.getBlog);

// get all the blogs from the database and send them to the client side
// blogRouter.get("/", controller.getAllBlogs);






 
module.exports = blogRouter;