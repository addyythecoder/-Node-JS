const express = require('express')
const app = express();
const port = 9999;
const cookieparser = require('cookie-parser')
const passport = require('passport');
const localstrategy = require('./middleware/localstrategy');
const session = require('express-session');
const flash = require('connect-flash');


//database connection
const dbconnect = require('./config/db.connection');
const flashmessage = require('./middleware/flashmessage');
dbconnect();


//middleware
app.set("view engine", 'ejs');
app.use(express.static('public'))
app.use(express.urlencoded());
app.use('/uploads', express.static('uploads'))
app.use(cookieparser());

app.use(session({
    name: 'admin-panel',
    secret: 'adminpanelsession',
    saveUninitialized: false,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser);
app.use(flashmessage);


//routes
app.use('/', require('./routes/index.routes'))
app.use('/web', require('./routes/web.routes'))
app.listen(port, () => {
    console.log(`Server Start At http://localhost:${port}`);
})
