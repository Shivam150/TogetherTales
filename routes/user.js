const userRouter = require("express").Router();

const controller = require("../controller/user");


userRouter.get("/signup", (req,res) => {
    res.render("signup");
} );

userRouter.get( "/login", ( req, res )=> {
    res.render("login");
})

userRouter.post("/signup", controller.signUp);
userRouter.post("/login", controller.signIn);
userRouter.get("/logout", controller.logOut);

module.exports = userRouter;