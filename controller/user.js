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


async function _doLogin(user, data) {
     
    if (user) {
      user = JSON.parse(JSON.stringify(user));
    }

    user = await userModel.findOne({ _id: user._id }).lean();
    user.token = await Utility.jwtSign({_id: user._id, role: "user", email: user.email,});
    user.type = "Bearer";
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
        // console.log("user password:===",user.password);

        if(!user){
            res.render("login", {message: 'Invalid Username'});
        }


        let match = await  Utility.comparePasswordUsingBcrypt(plainPassword, user.password);

        if(!match){
            res.render("login", {message: 'Invalid Password'});
        }
        user = await userModel.findOne({_id: user._id});
        if(user){
            user = await _doLogin(user, data);
            return res.redirect("/");
        }else {
            res.render("login", {message: 'Server Error!'});
        }
        // creation of token and set it to the cookie  will be handled here for authentication purpose .
        // return user will go here, this for separate backend  from frontend.
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    signUp,
    signIn,
}
