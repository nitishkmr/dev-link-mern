const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            seNewUrlParser: true
        });     //will wait for connection (async function always return a promise)
        console.log('MongoDB connected...');
    } catch (err){
        console.error(err.message);
        //Exit process on failure
        process.exit(1);
    }
}

//export connectDB function
module.exports = connectDB;