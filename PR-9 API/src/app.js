const express = require('express');
const dbConnect = require('./config/DBConnect');
const port = 9999;
const app = express();

//Data Base
dbConnect();

//middleware
app.use(express.urlencoded());
app.use(express.json());
app.use("/uploads",express.static("src/uploads"));

//Routes
app.use("/api", require("./routes/index.routes"));


app.listen(port , () => {
    console.log(`Server Start At http://localhost:${port}`);
})