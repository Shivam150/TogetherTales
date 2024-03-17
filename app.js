require("dotenv").config();
const path = require( "path" );
const express = require("express");
const app =   express();
const port  =   process.env.PORT || 8000;
const connection  = require("./connect/connect");
const http = require( 'http' );
const cookieParser =  require('cookie-parser');
const auth =  require('./service/auth');

const userRouter = require("./routes/user") ;
const blogRouter = require("./routes/blog");
const controller = require("./controller/blog");
app.use(express.json());  // 
app.use(express.urlencoded({ extended: false }));  // To handle form data.
app.use(cookieParser());// middleware to parse cookies and assign them to req.cookies
app.use(express.static(path.join(__dirname, "/public")));

// const controller = require("./controller/blog");

app.set("view engine" , "ejs");
app.set("views" , path.resolve("./views"));

let Server  = http.createServer(app);

app.get("/", auth.userAuth,  async (req,res) => {
    const getBlogs = await controller.getAllBlogs();
    console.log("All blogs::==",getBlogs);
    res.render("Home", {
        user: req.user,
        blogs: getBlogs
    });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);


Server.listen(port , async () => {
    console.log(`Server is running on   http://localhost:${port}`);
    await connection.mongoDbConnection();
    console.log( "Mongodb Connected Successfully!" );
});




