const mongoose = require( 'mongoose' );



let mongoDbConnection = async function() {
    const url =  process.env.MONGODB_URL;
    await mongoose.connect(url);
}


module.exports = {
    mongoDbConnection,
};