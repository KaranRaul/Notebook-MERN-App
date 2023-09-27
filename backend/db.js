const mongoose = require('mongoose');

// const mongoUri = "mongodb://localhost:27017/test";
// const mongoUri = "mongodb://localhost:27017/test"

const connectToMongo = () => {
    const mongoDB = "mongodb+srv://karanraul02:ajtkXnEw52xxUHmt@cluster0.vmz2mka.mongodb.net/notebook";
    mongoose.connect(mongoDB, (err) => {
        console.log("EROOR OCCURED" + err)
    });
}

module.exports = connectToMongo