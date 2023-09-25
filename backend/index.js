const mongoose = require("mongoose");
const connectToMongo = require("./db");
const express = require('express')
const cors = require("cors")
connectToMongo();

const app = express()
const port = process.env.PORT || 5000;
// const mongoDB = "mongodb://127.0.0.1/test1";
// mongoose.connect(mongoDB, (err) => {
//     console.log("EROOR OCCURED" + err)
// })
app.use(cors());
app.use(express.json())
app.get('/', (req, res) => {
    return res.json({ msg: "WORKING AP" })
})


//availabale routed
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`i-notebook backend app listening on port ${port}`)
})