const express = require("express");
const port = 8888;
const app = express();
const dbconnect = require('./config/db.connection');

//data base
dbconnect();

//middleware
app.set("view engine", 'ejs');
app.use(express.static("public"));
app.use('/uploads', express.static("uploads"));

app.use("/", require("./routes/index.rautes.js"))

app.listen(port, (err) =>{
    if(err){
        console.log(err);
        return;         
    }
    console.log(`Server Start At http://localhost:${port}/dashboard`);
});