const passport = require('passport');
const localstrategy = require('passport-local').Strategy;
const Admin = require('../model/admin.model')
const bcrypt = require('bcrypt')

passport.use(
    new localstrategy(
        { usernameField: 'email' },
        async (email, password, cb) => {
            let admin = await Admin.findOne({ email: email });
            if (!admin) {
                return cb(null, false)
            }

            let matchpass = await bcrypt.compare(password, admin.password)
            if (!matchpass) {
                return cb(null, false)
            };

            return cb(null, admin);
        }))

passport.serializeUser((user, cb) => {
    cb(null, user.id)
})
passport.deserializeUser(async (id, cb) => {
    let admin = await Admin.findById(id);
    cb(null, admin)
})

passport.checkAuthicate = (req, res, next) => {
    // console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.redirect('/');
    }
}

passport.setUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;