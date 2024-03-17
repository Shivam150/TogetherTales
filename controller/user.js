const Utility = require("../Utility/utility");
const userModel = require("../models/user");

const signUp = async (req,res) => {
    try {
        const data = req.body;
        data.password = await Utility.hashed_password(data.password);
        // find user to check if already exists or not 
        let user = await userModel.findOne({email:data.email , isDeleted: false});

        if(!user){
            user = await userModel.create(data);
            return res.redirect("/");
        }else {
            res.render("signup", {message: "User email already exist"});
        }

    } catch (error) {
        throw error;
    }
}


async function _doLogin(user,data) {
    data = {
        _id:  user._id,
        email: user.email,
        role: user.role
    };

    user = await userModel.findOne({ _id: user._id }).lean();
    user.token = await Utility.jwtSign(data);
    return user;
  }


const signIn = async (req,res) => {
    try {
        let data = req.body;
        let plainPassword = data.password;
        delete data.password;
        let qry = {
            email : data.email,
            isDeleted: false
        };

        let user = await userModel.findOne(qry, {password: 1}).lean();

        if(!user){
            res.render("login", {message: 'Invalid Username'});
        }

        let match = await  Utility.comparePasswordUsingBcrypt(plainPassword, user.password);

        if(!match){
            res.render("login", {message: 'Invalid Password'});
        }
        user = await userModel.findOne({_id: user._id});
         
        user = await _doLogin(user, data);
        console.log("user====:",user);
        return res.cookie("token",user.token).redirect("/");
        // creation of token and set it to the cookie  will be handled here for authentication purpose .
        // return user will go here, this for separate backend  from frontend.
    } catch (error) {
        console.log(error);
        res.render("login", {message: 'Server Error!'});
    }
}

const logOut = async (req,res)=> {
    try {
        res.clearCookie("token").redirect("/");
    } catch (error) {
        
    }
}






module.exports = {
    signUp,
    signIn,
    logOut,
}
