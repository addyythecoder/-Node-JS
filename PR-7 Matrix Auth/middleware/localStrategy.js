const passport = require("passport");
const AdminModel = require('../model/admin.model');
const bcrypt = require("bcrypt");

const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy({ usernameField: 'email'}, async(email, password, cb) =>{
    let admin = await AdminModel.findOne({email: email});
    if(!admin){
        return cb(null, false);
    }
    let matchpass = await bcrypt.compare(password, admin.password)
    if(!matchpass){
        return cb(null, false);
    }
    return cb(null, admin);
}))

passport.serializeUser((user, cb) =>{
    cb(null, user.id);
})

passport.deserializeUser(async(id,cb) =>{
    let admin = await AdminModel.findById(id);
    cb(null, admin);
})

passport.checkAuthicate = (req, res, next) =>{
    if(req.isAuthenticated()){
        next();
    }else{
        return res.redirect("/")
    }
    
}
passport.setUser = (req, res, next) =>{
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;