const mongoose = require('mongoose');

// const mongoUri = "mongodb://localhost:27017/test";
// const mongoUri = "mongodb://localhost:27017/test"

const connectToMongo = () => {
    const mongoDB = "mongodb://127.0.0.1/test";
    mongoose.connect(mongoDB, (err) => {
        console.log("EROOR OCCURED" + err)
    });
}

module.exports = connectToMongo