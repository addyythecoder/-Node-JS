const express = require("express");
const dbconnect = require("./config/db.connect");
const app = express();
let port = 9999;

dbconnect();

app.set("view engine", "ejs");
app.use(express.urlencoded());

app.use("/",require("./routes/book.routes"));

app.listen(port, () => {
    console.log(`server is starting http://localhost:${port} `);
})