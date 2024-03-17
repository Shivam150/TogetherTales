require("dotenv").config();
const Utility = require("../Utility/utility");

const userAuth = async (req, res, next) => {
    try {
        // get token from cookies
        const getToken = req.cookies["token"];
        if (!getToken){
          next();
        }
        // verify the token
        let decodedData = await Utility.verifyToken(getToken); 
        req.user = decodedData;
        console.log('User Authenticated',decodedData);
        next();
    } catch (error) {
      console.log(error);
    }
  };


module.exports = {
  userAuth,
}


