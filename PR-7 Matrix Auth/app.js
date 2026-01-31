const express = require("express");
const port = 9009;
const app = express();
const dbconnect = require('./config/db.connection');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const localStrategy = require('./middleware/localStrategy.js');
const session = require('express-session');

//data base
dbconnect();

//middleware
app.set("view engine", 'ejs');
app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.static("public"));
app.use('/uploads', express.static("uploads"));


app.use(session({
    name: 'blog',
    secret: 'test',
    saveUninitialized: false,
    resave: true,
    cookie: {
        maxAge : 1000*60*60*24
    } 
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser);


//routes
app.use("/", require("./routes/index.routes.js"))

app.listen(port, (err) =>{
    if(err){
        console.log(err);
        return;         
    }
    console.log(`Server Start At http://localhost:${port}`);
});