const express = require("express");
const dbconnect = require("./config/db.connect");
const path = require("path");

const app = express();

const port = 9999;
app.set("view engine", "ejs");

dbconnect();

app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/index.routes"));

app.use(express.static("public"));

app.use("/uploads",express.static("uploads"));

app.listen(port, () => {
    console.log(`server is starting http://localhost:${port} `);
})


