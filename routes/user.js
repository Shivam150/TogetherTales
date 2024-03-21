const userRouter = require("express").Router();

const controller = require("../controller/user");

const path = require( "path" );
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/images/`));
    },
    filename: function (req, file, cb) {
       const filename = `${Date.now()}-${file.originalname}`;  //Appending timestamp to the original filename.
       cb(null, filename);
    },
  });

  const upload = multer({ storage: storage })


userRouter.get("/signup", (req,res) => {
    res.render("signup");
} );

userRouter.get( "/login", ( req, res )=> {
    res.render("login");
})

userRouter.post("/signup",upload.single("profileImage"), controller.signUp);
userRouter.post("/login", controller.signIn);
userRouter.get("/logout", controller.logOut);

module.exports = userRouter;