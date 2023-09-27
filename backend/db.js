const mongoose = require('mongoose');

// const mongoUri = "mongodb://localhost:27017/test";
// const mongoUri = "mongodb://localhost:27017/test"

// const connectToMongo = () => {
//     const mongoDB = "mongodb+srv://karanraul02:ajtkXnEw52xxUHmt@cluster0.vmz2mka.mongodb.net/notebook";
//     mongoose.connect(mongoDB, (err) => {
//         console.log("EROOR OCCURED" + err)
//     });
// }

// module.exports = connectToMongo

const connectToMongo = () => {
    // const mongoose = require('mongoose');

    // Connect to MongoDB Atlas with updated options
    const url = 'mongodb+srv://karanraul02:ajtkXnEw52xxUHmt@cluster0.vmz2mka.mongodb.net/notebook';
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    mongoose.connect(url, options)
        .then(() => {
            console.log('Connected to MongoDB');
            // Your code to work with MongoDB using Mongoose here
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err);
        });
}

module.exports = connectToMongo;
