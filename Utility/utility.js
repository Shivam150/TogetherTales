const bcrypt = require('bcrypt');
require("dotenv").config();
const jwt = require('jsonwebtoken');

const hashed_password = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password,10);
        return  hashedPassword;
    } catch (error) {
        throw error;
    }
}

const comparePasswordUsingBcrypt = async (password , hashedPassword) => {
    try {
        return  await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw error;
    }
}

const jwtSign = async (payload) =>  {
    try {
        const token = await jwt.sign(payload, process.env.SECRET_KEY);
        console.log("Token:==",token);
        return token;
    } catch (error) {
        throw error;
    }
}

const verifyToken = async (token) => {
    try {
        return  await jwt.verify(token,process.env.SECRET_KEY);
    } catch (error) {
        throw error;
    }
}


module.exports = {
    hashed_password,
    comparePasswordUsingBcrypt,
    jwtSign,
    verifyToken,
}
