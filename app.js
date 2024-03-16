require("dotenv").config();
const path = require( "path" );
const express = require("express");
const app =   express();
const port  =   process.env.PORT || 8000;
const connection  = require("./connect/connect");
const http = require( 'http' );

const userRouter = require("./routes/user") ;
app.use(express.json());  // 
app.use(express.urlencoded({ extended: false }));  // To handle form data.


app.set("view engine" , "ejs");
app.set("views" , path.resolve("./views"));

let Server  = http.createServer(app);

app.get("/",  (req,res) => {
    res.render("Home");
})


app.use("/blog/user", userRouter);


Server.listen(port , async () => {
    console.log(`Server is running on   http://localhost:${port}`);
    await connection.mongoDbConnection();
    console.log( "Mongodb Connected Successfully!" );
});




